import type { Option } from "../models/option";
import { lineGuard } from "./markdown/line-guard";
import { fmtMdLine } from "./markdown/inline";
import { initGuard, safeMdOpt, stripKeep, keepWrap } from "./markdown/shared";

function typesetMarkdown(text: string, opt: Option, preview = false): string {
  const clean = stripKeep(text);
  const mdOpt = safeMdOpt(opt);
  const lines = clean.split("\n");
  const guard = initGuard();

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    const reason = lineGuard(line, guard);

    if (reason) {
      lines[i] = keepWrap(line, reason, preview);
      continue;
    }

    lines[i] = fmtMdLine(line, mdOpt, preview);
  }

  return lines.join("\n");
}

export { typesetMarkdown };
