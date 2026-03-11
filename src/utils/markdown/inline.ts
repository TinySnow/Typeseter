/**
 * Markdown 行内排版器：
 * - 先拆分行内代码范围（`...`），代码内容不改；
 * - 再识别链接/图片/URL token，避免修改 URL 本体；
 * - 剩余文本片段交给纯文本排版核心处理。
 */

import type { Option } from "../../models/option";
import { typeset } from "../typeset";
import { keepWrap } from "./shared";

type Seg = {
  raw: string;
  code: boolean;
};

const TOK_RE =
  /!\[[^\]]*\]\((?:[^()\\]|\\.)*?\)|\[[^\]]*\]\((?:[^()\\]|\\.)*?\)|<https?:\/\/[^>\s]+>|https?:\/\/[^\s<>)\]]+/g;
const LINK_TOK_RE = /^(!?\[)([^\]]*)(\]\((?:[^()\\]|\\.)*?\))$/;

function fmtMdLine(line: string, opt: Option, preview: boolean): string {
  if (!line) {
    return line;
  }

  const segs = splitCode(line);
  let out = "";

  for (const seg of segs) {
    if (seg.code) {
      out += keepWrap(seg.raw, "inline-code", preview);
      continue;
    }

    out += fmtNonCode(seg.raw, opt, preview);
  }

  return out;
}

function splitCode(line: string): Seg[] {
  const segs: Seg[] = [];
  let cur = 0;

  while (cur < line.length) {
    const open = line.indexOf("`", cur);
    if (open < 0) {
      segs.push({ raw: line.slice(cur), code: false });
      break;
    }

    if (open > cur) {
      segs.push({ raw: line.slice(cur, open), code: false });
    }

    const tickLen = tickRun(line, open);
    const close = findTickClose(line, open + tickLen, tickLen);
    if (close < 0) {
      segs.push({ raw: line.slice(open), code: false });
      break;
    }

    segs.push({ raw: line.slice(open, close + tickLen), code: true });
    cur = close + tickLen;
  }

  return segs;
}

function tickRun(line: string, start: number): number {
  let len = 0;
  while (start + len < line.length && line[start + len] === "`") {
    len += 1;
  }
  return len;
}

function findTickClose(line: string, start: number, tickLen: number): number {
  for (let i = start; i < line.length; i += 1) {
    if (line[i] !== "`") {
      continue;
    }

    const run = tickRun(line, i);
    if (run >= tickLen) {
      return i;
    }

    i += run - 1;
  }
  return -1;
}

function fmtNonCode(seg: string, opt: Option, preview: boolean): string {
  if (!seg) {
    return seg;
  }

  let out = "";
  let cur = 0;

  TOK_RE.lastIndex = 0;
  while (true) {
    const m = TOK_RE.exec(seg);
    if (!m) {
      break;
    }

    const token = m[0];
    const idx = m.index;
    out += fmtFrag(seg.slice(cur, idx), opt);
    out += fmtTok(token, opt, preview);
    cur = idx + token.length;
  }

  out += fmtFrag(seg.slice(cur), opt);
  return out;
}

function fmtTok(token: string, opt: Option, preview: boolean): string {
  const linkM = token.match(LINK_TOK_RE);
  if (!linkM) {
    return keepWrap(token, tokReason(token), preview);
  }

  const [, open, label, tail] = linkM;
  const out = `${open}${fmtFrag(label, opt)}${tail}`;
  return keepWrap(out, open === "![" ? "markdown-image" : "markdown-link", preview);
}

function tokReason(token: string): string {
  if (token.startsWith("<http")) {
    return "autolink";
  }
  if (token.startsWith("http")) {
    return "url";
  }
  return "token";
}

function fmtFrag(frag: string, opt: Option): string {
  if (!frag) {
    return frag;
  }

  const lead = frag.match(/^\s+/)?.[0] ?? "";
  const tail = frag.match(/\s+$/)?.[0] ?? "";
  const coreStart = lead.length;
  const coreEnd = frag.length - tail.length;

  if (coreEnd <= coreStart) {
    return frag;
  }

  const core = frag.slice(coreStart, coreEnd);
  return `${lead}${typeset(core, opt)}${tail}`;
}

export { fmtMdLine };
