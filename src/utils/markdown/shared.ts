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

export {
  initGuard,
  stripKeep,
  safeMdOpt,
  keepWrap,
  initGuard as newGuardState,
  stripKeep as stripKeepMarks,
  safeMdOpt as mdSafeOpt,
  keepWrap as wrapKeep,
};
export type { GuardState, GuardReason, GuardReason as ProtectedLineReason };
