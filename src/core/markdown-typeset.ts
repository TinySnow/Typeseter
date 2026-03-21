/**
 * Markdown 排版入口：
 * - 逐行判定是否需要保护；
 * - 普通文本行走行内排版；
 * - 可选输出 KEEP 保护标记用于可视化预览。
 */

import type { Option } from "./models/option";
import { lineGuard } from "./markdown/line-guard";
import { fmtMdLine } from "./markdown/inline";
import { applyMarkdownNormalizeRules } from "./markdown/normalize";
import { initGuard, safeMdOpt, stripKeep, keepWrap } from "./markdown/shared";

type MdBlockKind =
  | "blank"
  | "protected"
  | "table"
  | "list"
  | "heading"
  | "blockquote"
  | "hr"
  | "other";

/**
 * Markdown 排版处理函数
 * @param text 要排版的 Markdown 文本
 * @param opt 排版选项
 * @param preview 是否为预览模式，默认为 false
 * @returns 排版后的 Markdown 文本
 * @description 处理过程：
 * 1. 去除文本中的保护标记
 * 2. 获取安全的 Markdown 选项
 * 3. 将文本按换行符分割成行数组
 * 4. 如果启用了 mdAutoBlankLines 选项，则插入 Markdown 空白行
 * 5. 初始化保护状态
 * 6. 遍历每一行：
 *    - 检查是否需要保护，如果需要则保持原样
 *    - 否则使用 fmtMdLine 函数格式化行，并应用 Markdown 缩进
 * 7. 将处理后的行重新连接成字符串
 * 8. 如果不是预览模式，且启用了任何归一化选项，则应用 Markdown 归一化规则
 * 9. 返回处理后的文本
 */
function typesetMarkdown(text: string, opt: Option, preview = false): string {
  const clean = stripKeep(text);
  const mdOpt = safeMdOpt(opt);
  let lines = clean.split("\n");

  if (opt.mdAutoBlankLines) {
    lines = insertMdBlankLines(lines);
  }

  const guard = initGuard();

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    const reason = lineGuard(line, guard);

    if (reason) {
      lines[i] = keepWrap(line, reason, preview);
      continue;
    }

    const formatted = fmtMdLine(line, mdOpt, preview);
    const trimmed = trimMdParagraphLeadingSpaces(formatted, line, lines, i);
    lines[i] = applyMdIndent(trimmed, line, lines, i, opt);
  }

  let out = lines.join("\n");

  if (!preview) {
    const normalizeSwitches = {
      trimTrailingSpaces: opt.mdTrimTrailingSpaces,
      headingSpaceAfterHash: opt.mdHeadingSpaceAfterHash,
      headingSingleSpaceAfterHash: opt.mdHeadingSingleSpaceAfterHash,
      blankLineAroundHeadings: opt.mdBlankLineAroundHeadings,
      listMarkerSpace: opt.mdListMarkerSpace,
      blankLineAroundFences: opt.mdBlankLineAroundFences,
      blankLineAroundLists: opt.mdBlankLineAroundLists,
      ensureSingleTrailingNewline: opt.mdEnsureSingleTrailingNewline,
    };
    const hasNormalizeEnabled = Object.values(normalizeSwitches).some(Boolean);
    if (hasNormalizeEnabled) {
      out = applyMarkdownNormalizeRules(out, normalizeSwitches);
    }
  }

  return out;
}

/**
 * 为 Markdown 文本插入空白行
 * @param lines 原始行数组
 * @returns 插入空白行后的行数组
 * @description 处理逻辑：
 * 1. 初始化输出数组、保护状态、前一行类型和表格状态
 * 2. 遍历每一行：
 *    - 检查行是否需要保护
 *    - 对行进行分类
 *    - 根据前一行类型和当前行类型决定是否插入空白行
 *    - 将当前行添加到输出数组
 *    - 更新前一行类型
 * 3. 返回处理后的行数组
 */
function insertMdBlankLines(lines: string[]): string[] {
  const out: string[] = [];
  const guard = initGuard();
  let prevKind: MdBlockKind | null = null;
  let inTable = false;

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    const reason = lineGuard(line, guard);
    const info = classifyMdLine(line, reason, lines, i, inTable);
    inTable = info.inTable;

    if (shouldInsertBlank(prevKind, info.kind)) {
      out.push("");
    }

    out.push(line);
    prevKind = info.kind;
  }

  return out;
}

/**
 * 对 Markdown 行进行分类
 * @param line 当前要分类的行
 * @param reason 行保护的原因
 * @param lines 所有行的数组
 * @param idx 当前行的索引
 * @param inTable 是否在表格中的标志
 * @returns 包含行类型和是否在表格中标志的对象
 * @description 分类逻辑：
 * 1. 如果是空行，返回 { kind: "blank", inTable: false }
 * 2. 如果有保护原因：
 *    - 如果是表格分隔符，返回 { kind: "table", inTable: true }
 *    - 如果是代码块或 HTML 注释，返回 { kind: "protected", inTable: false }
 * 3. 如果当前行是表格标题，返回 { kind: "table", inTable: true }
 * 4. 如果当前在表格中且行包含 "|", 返回 { kind: "table", inTable: true }
 * 5. 如果是 ATX 标题行，返回 { kind: "heading", inTable: false }
 * 6. 如果是列表行，返回 { kind: "list", inTable: false }
 * 7. 如果是引用块，返回 { kind: "blockquote", inTable: false }
 * 8. 如果是水平分隔线，返回 { kind: "hr", inTable: false }
 * 9. 否则返回 { kind: "other", inTable: false }
 */
function classifyMdLine(
  line: string,
  reason: string | null,
  lines: string[],
  idx: number,
  inTable: boolean
): { kind: MdBlockKind; inTable: boolean } {
  if (isBlankLine(line)) {
    return { kind: "blank", inTable: false };
  }

  if (reason) {
    if (reason === "table-separator") {
      return { kind: "table", inTable: true };
    }
    if (reason.startsWith("fence") || reason.startsWith("html-comment")) {
      return { kind: "protected", inTable: false };
    }
  }

  const nextLine = lines[idx + 1] ?? "";
  if (isTableHeader(line, nextLine)) {
    return { kind: "table", inTable: true };
  }

  if (inTable && line.includes("|")) {
    return { kind: "table", inTable: true };
  }

  if (isAtxHeadingLine(line)) {
    return { kind: "heading", inTable: false };
  }

  if (isListLine(line)) {
    return { kind: "list", inTable: false };
  }

  if (isBlockquote(line)) {
    return { kind: "blockquote", inTable: false };
  }

  if (isHr(line)) {
    return { kind: "hr", inTable: false };
  }

  return { kind: "other", inTable: false };
}

/**
 * 判断是否应该在两行之间插入空白行
 * @param prev 前一行的类型
 * @param curr 当前行的类型
 * @returns 如果应该插入空白行，返回 true；否则返回 false
 * @description 判断逻辑：
 * 1. 如果前一行不存在，不插入空白行
 * 2. 如果前一行或当前行是空行，不插入空白行
 * 3. 如果前一行和当前行都是受保护的内容，不插入空白行
 * 4. 如果前一行和当前行都是表格，不插入空白行
 * 5. 如果前一行和当前行都是列表，不插入空白行
 * 6. 如果前一行和当前行都是引用块，不插入空白行
 * 7. 其他情况下，插入空白行
 */
function shouldInsertBlank(prev: MdBlockKind | null, curr: MdBlockKind): boolean {
  if (!prev) {
    return false;
  }

  if (prev === "blank" || curr === "blank") {
    return false;
  }

  if (prev === "protected" && curr === "protected") {
    return false;
  }

  if (prev === "table" && curr === "table") {
    return false;
  }

  if (prev === "list" && curr === "list") {
    return false;
  }

  if (prev === "blockquote" && curr === "blockquote") {
    return false;
  }

  return true;
}

/**
 * 判断一行是否是表格标题行
 * @param line 当前行
 * @param nextLine 下一行
 * @returns 如果是表格标题行，返回 true；否则返回 false
 * @description 判断逻辑：
 * 1. 如果当前行不包含 "|"，不是表格标题行
 * 2. 如果下一行是表格分隔线，当前行是表格标题行
 */
function isTableHeader(line: string, nextLine: string): boolean {
  if (!line.includes("|")) {
    return false;
  }
  return isTableSepLine(nextLine);
}

/**
 * 判断一行是否是表格分隔线
 * @param line 要判断的行
 * @returns 如果是表格分隔线，返回 true；否则返回 false
 * @description 判断逻辑：
 * 1. 去除行首尾空白
 * 2. 如果不包含 "|"，不是表格分隔线
 * 3. 使用正则表达式匹配表格分隔线格式
 */
function isTableSepLine(line: string): boolean {
  const trimmed = line.trim();
  if (!trimmed.includes("|")) {
    return false;
  }
  return /^\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?$/.test(trimmed);
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
  return /^\s{0,3}(?:[-+*]|\d+[.)])\s+/.test(line);
}

/**
 * 判断一行是否是引用块
 * @param line 要判断的行
 * @returns 如果是引用块，返回 true；否则返回 false
 * @description 使用正则表达式匹配引用块格式，以 > 开头
 */
function isBlockquote(line: string): boolean {
  return /^\s{0,3}>\s?/.test(line);
}

/**
 * 判断一行是否是水平分隔线
 * @param line 要判断的行
 * @returns 如果是水平分隔线，返回 true；否则返回 false
 * @description 使用正则表达式匹配水平分隔线格式，支持：
 * - 至少 3 个连续的 *, _, 或 -
 */
function isHr(line: string): boolean {
  return /^\s{0,3}([*_\-])\s*\1\s*\1(?:\s*\1)*\s*$/.test(line.trim());
}

/**
 * 应用 Markdown 缩进
 * @param formatted 格式化后的行
 * @param raw 原始行
 * @param opt 排版选项
 * @returns 应用缩进后的行
 * @description 处理逻辑：
 * 1. 如果未启用 mdIndentParagraphs 选项，直接返回格式化后的行
 * 2. 如果是空白行，直接返回格式化后的行
 * 3. 如果是 ATX 标题行，去除标题缩进
 * 4. 如果已经有前导缩进，直接返回格式化后的行
 * 5. 否则添加两个全角空格作为缩进
 */
function applyMdIndent(
  formatted: string,
  raw: string,
  lines: ReadonlyArray<string>,
  idx: number,
  opt: Option
): string {
  if (!opt.mdIndentParagraphs) {
    return formatted;
  }

  if (isBlankLine(raw)) {
    return formatted;
  }

  if (isAtxHeadingLine(raw)) {
    return stripHeadingIndent(formatted);
  }

  if (isMdStructuralLine(raw, lines, idx)) {
    return formatted;
  }

  if (hasLeadingIndent(formatted)) {
    return formatted;
  }

  return `　　${formatted}`;
}

/**
 * 去除标题行的缩进
 * @param line 标题行
 * @returns 去除缩进后的标题行
 * @description 使用正则表达式去除标题行开头的缩进空格
 */
function stripHeadingIndent(line: string): string {
  return line.replace(/^([ \t]{0,3})　+/, "$1");
}

function isMdStructuralLine(line: string, lines: ReadonlyArray<string>, idx: number): boolean {
  if (isListLine(line) || isBlockquote(line) || isHr(line)) {
    return true;
  }

  return isLikelyTableLine(line, lines, idx);
}

function isLikelyTableLine(line: string, lines: ReadonlyArray<string>, idx: number): boolean {
  const curr = line.trim();
  if (!curr.includes("|")) {
    return false;
  }

  const prev = (lines[idx - 1] ?? "").trim();
  const next = (lines[idx + 1] ?? "").trim();
  if (isTableSepLine(curr) || isTableSepLine(prev) || isTableSepLine(next)) {
    return true;
  }

  if (curr.startsWith("|")) {
    return true;
  }

  return prev.includes("|") || next.includes("|");
}

function trimMdParagraphLeadingSpaces(
  formatted: string,
  raw: string,
  lines: ReadonlyArray<string>,
  idx: number
): string {
  if (isBlankLine(raw)) {
    return formatted;
  }

  if (isAtxHeadingLine(raw) || isMdStructuralLine(raw, lines, idx) || isIndentedCodeLine(raw)) {
    return formatted;
  }

  return formatted.replace(/^[ \t\u3000]+/, "");
}

function isIndentedCodeLine(line: string): boolean {
  return /^(?: {4,}|\t+)/.test(line);
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
  return /^[ \t]{0,3}　*#{1,6}(?:\s|$)/.test(line);
}

/**
 * 判断一行是否有前导缩进
 * @param line 要判断的行
 * @returns 如果有前导缩进（两个全角空格），返回 true；否则返回 false
 */
function hasLeadingIndent(line: string): boolean {
  return line.startsWith("　　");
}

export { typesetMarkdown };
