import type { Option } from "../../models/option";
import { isAsciiWord, isCnPunc, isDigit, isHan, isWs, nextNonWs, skipWs } from "../chars";
import { mapP } from "./shared";
import type { Rule } from "./types";

/**
 * 纯文本核心总线规则（单次遍历扫描）。
 *
 * 目标：把原先分散在多个规则中的线性文本处理（空格 / 拉丁标点 / 百分号空格）
 * 合并到一条扫描链中，减少重复遍历次数。
 */

/** 删除空段。 */
const rmBlankRule: Rule = {
  id: "deleteBlankLines",
  apply: (paras, opt) => {
    if (!opt.deleteBlankLines) {
      return paras;
    }
    return paras.filter((s) => s !== null);
  },
};

/** 段首缩进（两个全角空格）。 */
const insIndentRule: Rule = {
  id: "insertIndent",
  apply: (paras, opt) => {
    if (!opt.insertIndent) {
      return paras;
    }
    return mapP(paras, (s) => `　　${s}`);
  },
};

/**
 * 核心扫描规则：
 * - 删除中文相关空白（按开关）
 * - 拉丁标点按中文上下文转换（按开关）
 * - 中英文边界插入空格（按开关）
 * - 百分号后空格（按开关）
 */
const coreRule: Rule = {
  id: "coreNormalize",
  apply: (paras, opt) => mapP(paras, (line) => normalizeLine(line, opt)),
};

function normalizeLine(line: string, opt: Option): string {
  let out = "";
  let prevRawNonWs: string | null = null;

  for (let i = 0; i < line.length; i += 1) {
    const ch = line[i];

    if (isWs(ch)) {
      // 按旧规则语义：删除目标上下文里的连续空白块，其余空白保持原样。
      let j = i;
      while (j < line.length && isWs(line[j])) {
        j += 1;
      }

      const next = nextNonWs(line, j);
      const dropCnCn =
        opt.deleteSpaceInChineseCharacter &&
        prevRawNonWs !== null &&
        next !== null &&
        isHan(prevRawNonWs) &&
        isHan(next);

      const dropCnPunc =
        opt.deleteSpaceBetweenChineseCharactersAndChinesePunctuations &&
        prevRawNonWs !== null &&
        next !== null &&
        ((isHan(prevRawNonWs) && isCnPunc(next)) ||
          (isCnPunc(prevRawNonWs) && isHan(next)));

      if (!dropCnCn && !dropCnPunc) {
        out += line.slice(i, j);
      }

      i = j - 1;
      continue;
    }

    // dots2ellipsis 的历史顺序在 dot 之前；这里保持该优先级。
    if (opt.fixPunctuation && opt.dots2ellipsis && ch === ".") {
      const runLen = countDotRun(line, i);
      if (runLen >= 3) {
        out += "……";
        prevRawNonWs = ".";
        i += runLen - 1;
        continue;
      }
    }

    const fixed = fixLatPuncAt(line, i, ch, opt);
    if (fixed) {
      out += fixed.out;
      prevRawNonWs = ch;
      i = fixed.nextIdx - 1;
      continue;
    }

    out += ch;

    // 可选规则：百分号后如果紧跟汉字，补一个半角空格。
    if (opt.fixOthers && opt.insertSpaceAfterPercentSign && ch === "%") {
      const next = i + 1 < line.length ? line[i + 1] : null;
      if (isHan(next)) {
        out += " ";
      }
    }

    // 中英文边界插空格（仅当原文本是相邻字符）。
    if (opt.insertSpaceInChineseAndEnglish) {
      const next = i + 1 < line.length ? line[i + 1] : null;
      if (next && !isWs(next) && shouldInsCnEnSp(ch, next)) {
        out += " ";
      }
    }

    prevRawNonWs = ch;
  }

  // 保持历史行为：dot 修正后恢复段首编号的句点。
  if (opt.fixPunctuation && opt.dot) {
    return recoverListDotPrefix(out);
  }

  return out;
}

/** 在当前位置按上下文尝试做拉丁标点转换。 */
function fixLatPuncAt(
  line: string,
  i: number,
  ch: string,
  opt: Option
): { out: string; nextIdx: number } | null {
  if (!opt.fixPunctuation) {
    return null;
  }

  const to = mapLatPunc(ch, opt);
  if (!to) {
    return null;
  }

  // 与旧实现一致：前面必须至少有一个字符；
  // 且（前一字符是汉字，或后面第一个非空白字符是汉字）才进行转换。
  const prev = i > 0 ? line[i - 1] : null;
  const next = nextNonWs(line, i + 1);
  const shouldFix = prev !== null && (isHan(prev) || isHan(next));

  if (!shouldFix) {
    return null;
  }

  return {
    out: to,
    nextIdx: skipWs(line, i + 1),
  };
}

/** 根据开关把拉丁标点映射到中文标点。 */
function mapLatPunc(ch: string, opt: Option): string | null {
  if (ch === "," && opt.comma) {
    return "，";
  }
  if (ch === "." && opt.dot) {
    return "。";
  }
  if (ch === ":" && opt.colon) {
    return "：";
  }
  if (ch === "?" && opt.questionMark) {
    return "？";
  }
  if (ch === "!" && opt.bang) {
    return "！";
  }
  if (ch === ";" && opt.semicolon) {
    return "；";
  }
  return null;
}

/** 统计从 start 开始连续 '.' 的数量。 */
function countDotRun(text: string, start: number): number {
  let i = start;
  while (i < text.length && text[i] === ".") {
    i += 1;
  }
  return i - start;
}

/** 判断是否需要在相邻字符之间插入中英文空格。 */
function shouldInsCnEnSp(left: string, right: string): boolean {
  return (
    (isHan(left) && isAsciiWord(right)) ||
    (isAsciiWord(left) && isHan(right))
  );
}

/**
 * 恢复段首序号句点：
 * - 1。 -> 1. 
 * - 1.2.3。 -> 1.2.3. 
 */
function recoverListDotPrefix(line: string): string {
  let i = 0;
  while (i < line.length && isWs(line[i])) {
    i += 1;
  }

  let p = i;
  if (!isDigit(line[p] ?? null)) {
    return line;
  }

  while (p < line.length && isDigit(line[p])) {
    p += 1;
  }

  while (p < line.length && line[p] === ".") {
    let q = p + 1;
    if (q >= line.length || !isDigit(line[q])) {
      break;
    }
    while (q < line.length && isDigit(line[q])) {
      q += 1;
    }
    p = q;
  }

  if (p < line.length && line[p] === "。") {
    return `${line.slice(0, p)}. ${line.slice(p + 1)}`;
  }

  return line;
}

export { rmBlankRule, insIndentRule, coreRule };
