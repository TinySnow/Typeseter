/**
 * 可执行文件侧适配入口（与 Web UI 解耦）。
 * 这里不绑定 Node I/O，仅提供模式分发，便于后续接入 telegram bot 或 CLI。
 */

import type { Option } from "../core/models/option";
import { typeset } from "../core/typeset";
import { typesetMarkdown } from "../core/markdown-typeset";

type RunMode = "plain" | "markdown";

function runTypeset(input: string, opt: Option, mode: RunMode, preview = false): string {
  if (mode === "markdown") {
    return typesetMarkdown(input, opt, preview);
  }
  return typeset(input, opt);
}

export { runTypeset };
export type { RunMode };
