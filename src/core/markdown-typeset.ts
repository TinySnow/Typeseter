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
