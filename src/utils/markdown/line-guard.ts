/**
 * Markdown 按行保护判定器：
 * - 识别 fenced code、HTML 注释、表格分隔线；
 * - 返回保护原因供预览模式插入 KEEP 标记。
 */

import type { GuardState, GuardReason } from "./shared";

function lineGuard(line: string, state: GuardState): GuardReason | null {
  if (state.fence.inFence) {
    if (isFenceClose(line, state.fence.fenceChar, state.fence.fenceLen)) {
      state.fence.inFence = false;
      state.fence.fenceChar = "";
      state.fence.fenceLen = 0;
      return "fence-close";
    }
    return "fence-body";
  }

  if (state.comment.inComment) {
    if (line.includes("-->")) {
      state.comment.inComment = false;
      return "html-comment-close";
    }
    return "html-comment-body";
  }

  const opener = getFenceOpen(line);
  if (opener) {
    state.fence.inFence = true;
    state.fence.fenceChar = opener.char;
    state.fence.fenceLen = opener.len;
    return "fence-open";
  }

  if (line.includes("<!--")) {
    if (!line.includes("-->")) {
      state.comment.inComment = true;
    }
    return "html-comment";
  }

  if (isTableSep(line)) {
    return "table-separator";
  }

  return null;
}

function getFenceOpen(line: string): { char: "`" | "~"; len: number } | null {
  const m = line.match(/^\s*([`~]{3,})/);
  if (!m) {
    return null;
  }

  const token = m[1];
  const char = token[0] as "`" | "~";
  return { char, len: token.length };
}

function isFenceClose(line: string, char: "`" | "~" | "", len: number): boolean {
  if (!char || len <= 0) {
    return false;
  }

  const escaped = char === "`" ? "`" : "~";
  return new RegExp(`^\\s*${escaped}{${len},}\\s*$`).test(line);
}

function isTableSep(line: string): boolean {
  const trimmed = line.trim();
  if (!trimmed.includes("|")) {
    return false;
  }

  return /^\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?$/.test(trimmed);
}

export { lineGuard };
