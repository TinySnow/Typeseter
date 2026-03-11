import { mapP } from "./shared";
import { Paras } from "./types";
import { isDigit, isHan, isWs, nextNonWs, skipWs } from "../chars";

/**
 * 拉丁标点转中文标点（上下文感知版）。
 * 与旧正则版目标一致：
 * - 仅在“与中文上下文相关”的场景转换；
 * - 纯英文语句内标点尽量保持原样。
 */

function comma(on: boolean, paras: Paras): Paras {
  return fixLatPunc(on, paras, ",", "，");
}

/**
 * 句点规则分两步：
 * 1) 先按上下文把英文句点转中文句号；
 * 2) 再恢复段首序号的句点（如 1. / 1.1.）。
 */
function dot(on: boolean, paras: Paras): Paras {
  if (!on) {
    return paras;
  }

  mapP(paras, (line) => fixLatPuncInLine(line, ".", "。"));
  return mapP(paras, recoverListDotPrefix);
}

function colon(on: boolean, paras: Paras): Paras {
  return fixLatPunc(on, paras, ":", "：");
}

function qMark(on: boolean, paras: Paras): Paras {
  return fixLatPunc(on, paras, "?", "？");
}

function bang(on: boolean, paras: Paras): Paras {
  return fixLatPunc(on, paras, "!", "！");
}

function semi(on: boolean, paras: Paras): Paras {
  return fixLatPunc(on, paras, ";", "；");
}

/**
 * 把包含汉字内容的英文括号转换为中文括号。
 * 使用栈结构支持嵌套括号：
 * - 只有某一对括号内部出现汉字时，才替换这一对；
 * - 不含汉字的括号保持英文样式。
 */
function enBr2CnBr(on: boolean, paras: Paras): Paras {
  if (!on) {
    return paras;
  }

  return mapP(paras, (line) => {
    const chars = Array.from(line);
    const stack: number[] = [];

    for (let i = 0; i < chars.length; i += 1) {
      const ch = chars[i];
      if (ch === "(") {
        stack.push(i);
        continue;
      }

      if (ch !== ")" || stack.length === 0) {
        continue;
      }

      const open = stack.pop() as number;
      if (!hasHan(chars, open + 1, i)) {
        continue;
      }

      chars[open] = "（";
      chars[i] = "）";
    }

    return chars.join("");
  });
}

/** 开关封装：批量对段落执行单行标点替换。 */
function fixLatPunc(on: boolean, paras: Paras, src: string, dst: string): Paras {
  if (!on) {
    return paras;
  }

  return mapP(paras, (line) => fixLatPuncInLine(line, src, dst));
}

/**
 * 单行拉丁标点转换器。
 * 判定规则：
 * - 当前字符是 src；
 * - 且（前一个字符是汉字，或后一个非空白字符是汉字）；
 * 则将 src 替换为 dst，并吞掉其后的连续空白。
 */
function fixLatPuncInLine(line: string, src: string, dst: string): string {
  if (!line.includes(src)) {
    return line;
  }

  let out = "";

  for (let i = 0; i < line.length; i += 1) {
    const ch = line[i];
    if (ch !== src) {
      out += ch;
      continue;
    }

    const prev = i > 0 ? line[i - 1] : null;
    const next = nextNonWs(line, i + 1);
    const shouldFix = prev !== null && (isHan(prev) || isHan(next));

    if (!shouldFix) {
      out += ch;
      continue;
    }

    out += dst;

    // 与旧实现一致：标点后若已是空白，转换后去掉该段空白。
    i = skipWs(line, i + 1) - 1;
  }

  return out;
}

/**
 * 恢复段首多级序号的点号。
 * 例如：
 * - "1。 第一条" -> "1. 第一条"
 * - "1.2.3。 内容" -> "1.2.3. 内容"
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

  // 匹配多级编号中的 ".数字" 片段
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

/** 检查字符片段 [start, end) 内是否出现汉字。 */
function hasHan(chars: string[], start: number, end: number): boolean {
  for (let i = start; i < end; i += 1) {
    if (isHan(chars[i])) {
      return true;
    }
  }
  return false;
}

export { comma, dot, colon, qMark, bang, semi, enBr2CnBr };
