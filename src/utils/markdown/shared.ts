/**
 * Markdown 排版共享工具：
 * - 维护保护状态（围栏代码块、HTML 注释）；
 * - 清理/包裹 KEEP 标记；
 * - 在 Markdown 模式下禁用不适合的纯文本规则。
 */

import type { Option } from "../../models/option";

type FenceState = {
  inFence: boolean;
  fenceChar: "`" | "~" | "";
  fenceLen: number;
};

type CommentState = {
  inComment: boolean;
};

type GuardState = {
  fence: FenceState;
  comment: CommentState;
};

type GuardReason =
  | "fence-open"
  | "fence-body"
  | "fence-close"
  | "html-comment"
  | "html-comment-body"
  | "html-comment-close"
  | "table-separator";

function initGuard(): GuardState {
  return {
    fence: { inFence: false, fenceChar: "", fenceLen: 0 },
    comment: { inComment: false },
  };
}

function stripKeep(text: string): string {
  return text.replace(/\[\[KEEP:[^\]]+\]\]/g, "").replace(/\[\[\/KEEP\]\]/g, "");
}

/** Markdown 模式禁用空行删除/段首缩进/段间距，避免破坏结构。 */
function safeMdOpt(opt: Option): Option {
  return {
    ...opt,
    deleteBlankLines: false,
    insertIndent: false,
    lineGap: 0,
    customedLineBreaker: "",
  };
}

function keepWrap(text: string, reason: string, preview: boolean): string {
  if (!preview) {
    return text;
  }
  return `[[KEEP:${reason}]]${text}[[/KEEP]]`;
}

export { initGuard, stripKeep, safeMdOpt, keepWrap };
export type { GuardState, GuardReason };
