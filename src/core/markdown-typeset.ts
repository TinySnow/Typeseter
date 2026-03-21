﻿﻿/**
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
    lines[i] = applyMdIndent(formatted, line, opt);
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

function isTableHeader(line: string, nextLine: string): boolean {
  if (!line.includes("|")) {
    return false;
  }
  return isTableSepLine(nextLine);
}

function isTableSepLine(line: string): boolean {
  const trimmed = line.trim();
  if (!trimmed.includes("|")) {
    return false;
  }
  return /^\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?$/.test(trimmed);
}

function isListLine(line: string): boolean {
  return /^\s{0,3}(?:[-+*]|\d+[.)])\s+/.test(line);
}

function isBlockquote(line: string): boolean {
  return /^\s{0,3}>\s?/.test(line);
}

function isHr(line: string): boolean {
  return /^\s{0,3}([*_\-])\s*\1\s*\1(?:\s*\1)*\s*$/.test(line.trim());
}

function applyMdIndent(formatted: string, raw: string, opt: Option): string {
  if (!opt.mdIndentParagraphs) {
    return formatted;
  }

  if (isBlankLine(raw)) {
    return formatted;
  }

  if (isAtxHeadingLine(raw)) {
    return stripHeadingIndent(formatted);
  }

  if (hasLeadingIndent(formatted)) {
    return formatted;
  }

  return `　　${formatted}`;
}

function stripHeadingIndent(line: string): string {
  return line.replace(/^([ \t]{0,3})　+/, "$1");
}

function isBlankLine(line: string): boolean {
  return line.trim().length === 0;
}

function isAtxHeadingLine(line: string): boolean {
  return /^[ \t]{0,3}　*#{1,6}(?:\s|$)/.test(line);
}

function hasLeadingIndent(line: string): boolean {
  return line.startsWith("　　");
}

export { typesetMarkdown };