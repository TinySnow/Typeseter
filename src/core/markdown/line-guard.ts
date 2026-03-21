/**
 * Markdown 按行保护判定器：
 * - 识别 fenced code、HTML 注释、表格分隔线；
 * - 返回保护原因供预览模式插入 KEEP 标记。
 */

import type { GuardState, GuardReason } from "./shared";

/**
 * 按行判断 Markdown 内容是否需要保护
 * @param line 当前行
 * @param state 保护状态
 * @returns 保护原因，如果不需要保护则返回 null
 * @description 处理逻辑：
 * 1. 如果当前在代码块内，检查是否是代码块结束
 * 2. 如果当前在 HTML 注释内，检查是否是注释结束
 * 3. 检查是否是代码块开始
 * 4. 检查是否是 HTML 注释
 * 5. 检查是否是表格分隔线
 * 6. 如果都不是，返回 null
 */
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

/**
 * 获取代码块开始标记
 * @param line 当前行
 * @returns 代码块开始标记的信息，包括字符和长度，如果不是代码块开始则返回 null
 * @description 匹配以至少 3 个反引号或波浪号开头的行
 */
function getFenceOpen(line: string): { char: "`" | "~"; len: number } | null {
  const m = line.match(/^\s*([`~]{3,})/);
  if (!m) {
    return null;
  }

  const token = m[1];
  const char = token[0] as "`" | "~";
  return { char, len: token.length };
}

/**
 * 判断是否是代码块结束标记
 * @param line 当前行
 * @param char 代码块标记字符
 * @param len 代码块标记长度
 * @returns 如果是代码块结束标记，返回 true；否则返回 false
 * @description 检查行是否以至少指定长度的相同字符结束
 */
function isFenceClose(line: string, char: "`" | "~" | "", len: number): boolean {
  if (!char || len <= 0) {
    return false;
  }

  const escaped = char === "`" ? "`" : "~";
  return new RegExp(`^\s*${escaped}{${len},}\s*$`).test(line);
}

/**
 * 判断是否是表格分隔线
 * @param line 当前行
 * @returns 如果是表格分隔线，返回 true；否则返回 false
 * @description 检查行是否符合表格分隔线的格式
 */
function isTableSep(line: string): boolean {
  const trimmed = line.trim();
  if (!trimmed.includes("|")) {
    return false;
  }

  return /^\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?$/.test(trimmed);
}

export { lineGuard };