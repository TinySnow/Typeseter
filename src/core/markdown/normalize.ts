/**
 * Markdown 结构规范化（轻量版）：
 * - 覆盖一批低风险、可自动修复的结构规则；
 * - 跳过受保护区域（围栏代码块、HTML 注释块、表格分隔线）。
 */

import { lineGuard } from "./line-guard";
import { initGuard } from "./shared";

type MarkdownNormalizeSwitches = {
  trimTrailingSpaces: boolean;
  headingSpaceAfterHash: boolean;
  headingSingleSpaceAfterHash: boolean;
  blankLineAroundHeadings: boolean;
  listMarkerSpace: boolean;
  blankLineAroundFences: boolean;
  blankLineAroundLists: boolean;
  ensureSingleTrailingNewline: boolean;
  collapseBlankLines: boolean;
};

function applyMarkdownNormalizeRules(text: string, opt: MarkdownNormalizeSwitches): string {
  const source = text.replace(/\r\n/g, "\n");
  let lines = source.split("\n");
  const protectedLines = markProtected(lines);

  for (let i = 0; i < lines.length; i += 1) {
    if (protectedLines[i]) {
      continue;
    }

    let curr = lines[i];

    if (opt.headingSpaceAfterHash || opt.headingSingleSpaceAfterHash) {
      const noSpaceHeading = curr.match(/^(\s{0,3}#{1,6})([^#\s].*)$/);
      if (noSpaceHeading && opt.headingSpaceAfterHash) {
        curr = `${noSpaceHeading[1]} ${noSpaceHeading[2]}`;
      } else {
        const multiSpaceHeading = curr.match(/^(\s{0,3}#{1,6})[ \t]{2,}(\S.*)$/);
        if (multiSpaceHeading && opt.headingSingleSpaceAfterHash) {
          curr = `${multiSpaceHeading[1]} ${multiSpaceHeading[2]}`;
        }
      }
    }

    if (opt.listMarkerSpace) {
      const noSpaceList = curr.match(/^([ \t]{0,3})([-+*]|\d+[.)])(\S.*)$/);
      if (noSpaceList) {
        const indent = noSpaceList[1];
        const marker = noSpaceList[2];
        const content = noSpaceList[3];
        if (shouldNormalizeNoSpaceList(marker, content)) {
          curr = `${indent}${marker} ${content}`;
        }
      } else {
        const multiSpaceList = curr.match(/^([ \t]{0,3}(?:[-+*]|\d+[.)]))[ \t]{2,}(\S.*)$/);
        if (multiSpaceList) {
          curr = `${multiSpaceList[1]} ${multiSpaceList[2]}`;
        }
      }
    }

    if (opt.trimTrailingSpaces) {
      curr = curr.replace(/[ \t]+$/g, "");
    }

    lines[i] = curr;
  }

  lines = fixStructuralBlankLines(lines, protectedLines, opt);

  if (opt.collapseBlankLines) {
    lines = collapseConsecutiveBlankLines(lines);
  }

  let out = lines.join("\n");
  if (opt.ensureSingleTrailingNewline) {
    out = out.replace(/\n*$/, "\n");
  }
  return out;
}

/**
 * 修复 Markdown 结构中的空白行
 * @param lines 行数组
 * @param protectedLines 受保护行的标记数组
 * @param opt 规范化选项
 * @returns 修复空白行后的行数组
 * @description 处理逻辑：
 * 1. 遍历每一行
 * 2. 在标题、代码块、列表前添加空白行（如果需要）
 * 3. 添加当前行
 * 4. 在标题、代码块、列表后添加空白行（如果需要）
 */
function fixStructuralBlankLines(
  lines: string[],
  protectedLines: boolean[],
  opt: MarkdownNormalizeSwitches
): string[] {
  const out: string[] = [];

  for (let i = 0; i < lines.length; i += 1) {
    const curr = lines[i];
    const prevOut = out.length > 0 ? out[out.length - 1] : null;
    const next = i + 1 < lines.length ? lines[i + 1] : null;

    const currFence = isFenceLine(curr);
    const currHeading = !protectedLines[i] && isAtxHeadingLine(curr);
    const currList = !protectedLines[i] && isListLine(curr);

    if (prevOut !== null && !isBlankLine(prevOut)) {
      if (currHeading && opt.blankLineAroundHeadings) {
        out.push("");
      } else if (currFence && opt.blankLineAroundFences) {
        out.push("");
      } else if (
        currList &&
        opt.blankLineAroundLists &&
        !isListLine(prevOut) &&
        !isListContinuationLine(prevOut)
      ) {
        out.push("");
      }
    }

    out.push(curr);

    if (next !== null && !isBlankLine(next)) {
      if (currHeading && opt.blankLineAroundHeadings) {
        out.push("");
      } else if (currFence && opt.blankLineAroundFences) {
        out.push("");
      } else if (
        currList &&
        opt.blankLineAroundLists &&
        !isListLine(next) &&
        !isListContinuationLine(next)
      ) {
        out.push("");
      }
    }
  }

  return out;
}

/**
 * 标记受保护的行
 * @param lines 行数组
 * @returns 受保护行的标记数组
 * @description 遍历每一行，使用 lineGuard 函数判断是否需要保护
 */
function markProtected(lines: string[]): boolean[] {
  const state = initGuard();
  const out = new Array<boolean>(lines.length);

  for (let i = 0; i < lines.length; i += 1) {
    const reason = lineGuard(lines[i], state);
    out[i] = reason !== null;
  }

  return out;
}

/**
 * 判断一行是否是空行
 * @param line 要判断的行
 * @returns 如果是空行，返回 true；否则返回 false
 * @description 判断逻辑：去除行首尾空白后长度为 0
 */
function isBlankLine(line: string): boolean {
  return line.trim().length === 0;
}

/**
 * 判断一行是否是 ATX 标题行
 * @param line 要判断的行
 * @returns 如果是 ATX 标题行，返回 true；否则返回 false
 * @description 使用正则表达式匹配 ATX 标题格式，以 1-6 个 # 开头
 */
function isAtxHeadingLine(line: string): boolean {
  return /^[ \t]{0,3}#{1,6}(?:\s|$)/.test(line);
}

/**
 * 判断一行是否是列表行
 * @param line 要判断的行
 * @returns 如果是列表行，返回 true；否则返回 false
 * @description 使用正则表达式匹配列表行格式，支持：
 * - 无序列表：以 -, +, * 开头
 * - 有序列表：以数字+点或括号开头
 */
function isListLine(line: string): boolean {
  return /^[ \t]{0,3}(?:[-+*]|\d+[.)])\s+/.test(line);
}

/**
 * 判断一行是否是列表续行
 * @param line 要判断的行
 * @returns 如果是列表续行，返回 true；否则返回 false
 * @description 匹配以至少 2 个空格开头且后面跟着非空白字符的行
 */
function isListContinuationLine(line: string): boolean {
  return /^\s{2,}\S/.test(line);
}

/**
 * 判断一行是否是代码块标记行
 * @param line 要判断的行
 * @returns 如果是代码块标记行，返回 true；否则返回 false
 * @description 匹配以至少 3 个反引号或波浪号开头的行
 */
function isFenceLine(line: string): boolean {
  return /^\s*([`~])\1{2,}/.test(line);
}

/**
 * 判断是否应该规范化无空格列表
 * @param marker 列表标记
 * @param content 列表内容
 * @returns 如果应该规范化，返回 true；否则返回 false
 * @description 判断逻辑：
 * 1. 如果标记不是 "*"，应该规范化
 * 2. 如果标记是 "*"，检查内容的第一个 token 是否包含 "*"，如果不包含则应该规范化
 */
function shouldNormalizeNoSpaceList(marker: string, content: string): boolean {
  if (marker !== "*") {
    return true;
  }

  const firstToken = content.match(/^\S+/)?.[0] ?? "";
  return !firstToken.includes("*");
}

function collapseConsecutiveBlankLines(lines: string[]): string[] {
  const out: string[] = [];
  let blankRun = 0;

  for (let i = 0; i < lines.length; i += 1) {
    if (isBlankLine(lines[i])) {
      blankRun += 1;
    } else {
      flushCollapsedBlanks(out, blankRun);
      blankRun = 0;
      out.push(lines[i]);
    }
  }

  flushCollapsedBlanks(out, blankRun);
  return out;
}

function flushCollapsedBlanks(out: string[], blankRun: number) {
  if (blankRun === 0) {
    return;
  }

  if (blankRun === 1) {
    out.push("");
    return;
  }

  out.push("");
  for (let j = 0; j < blankRun - 1; j += 1) {
    out.push("<br />");
  }
}

export { applyMarkdownNormalizeRules };
export type { MarkdownNormalizeSwitches };
