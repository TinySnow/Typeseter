﻿﻿﻿/**
 * Markdown 行内排版器：
 * - 先拆分行内代码范围（`...`），代码内容不改；
 * - 再识别链接/图片/URL token，避免修改 URL 本体；
 * - 剩余文本片段交给纯文本排版核心处理。
 */

import type { Option } from "../models/option";
import { isCnPunc, isHan, isWs } from "../chars";
import { typeset } from "../typeset";
import { keepWrap } from "./shared";

type Seg = {
  raw: string;
  code: boolean;
};

const TOK_RE =
  /!\[[^\]]*\]\((?:[^()\\]|\\.)*?\)|\[[^\]]*\]\((?:[^()\\]|\\.)*?\)|<https?:\/\/[^>\s]+>|https?:\/\/[^\s<>)\]]+/g;
const LINK_TOK_RE = /^(!?\[)([^\]]*)(\]\((?:[^()\\]|\\.)*?\))$/;

/**
 * 格式化 Markdown 行
 * @param line 要格式化的 Markdown 行
 * @param opt 排版选项
 * @param preview 是否为预览模式
 * @returns 格式化后的字符串
 * @description 处理过程：
 * 1. 检查行是否为空，如果为空则直接返回
 * 2. 调用 splitCode 函数将行拆分为代码段和非代码段
 * 3. 遍历所有段，如果是代码段则保持原样，否则调用 fmtNonCode 函数处理非代码段
 * 4. 最后返回处理后的字符串
 */
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

/**
 * 处理链接、图片等标记
 * @param token 标记字符串
 * @param opt 排版选项
 * @param preview 是否为预览模式
 * @returns 处理后的字符串
 * @description 处理过程：
 * 1. 尝试匹配链接或图片格式
 * 2. 如果不是链接或图片，直接保持原样
 * 3. 如果是链接或图片，对标签部分进行处理
 * 4. 保持链接或图片的格式
 */
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

  let core = frag.slice(coreStart, coreEnd);
  if (opt.mdStyleSpacing) {
    core = applyMdStyleSpacing(core);
  }

  return `${lead}${typeset(core, opt)}${tail}`;
}

function applyMdStyleSpacing(text: string): string {
  let out = text;
  out = addBoldSpacing(out);
  out = addItalicSpacing(out);
  out = addUnderlineSpacing(out);
  return out;
}

function addBoldSpacing(text: string): string {
  return addDelimitedSpacing(text, "**", "**");
}

function addItalicSpacing(text: string): string {
  return addItalicDelimitedSpacing(text);
}

function addUnderlineSpacing(text: string): string {
  return addDelimitedSpacing(text, "<u>", "</u>");
}

function addDelimitedSpacing(text: string, open: string, close: string): string {
  let out = "";
  let cur = 0;

  while (cur < text.length) {
    const openIdx = text.indexOf(open, cur);
    if (openIdx < 0) {
      out += text.slice(cur);
      break;
    }

    const closeIdx = text.indexOf(close, openIdx + open.length);
    if (closeIdx < 0) {
      out += text.slice(cur);
      break;
    }

    out += text.slice(cur, openIdx);

    const prev = openIdx > 0 ? text[openIdx - 1] : null;
    const next = closeIdx + close.length < text.length ? text[closeIdx + close.length] : null;

    if (needsLeftSpace(prev, out)) {
      out += " ";
    }

    out += text.slice(openIdx, closeIdx + close.length);

    if (needsRightSpace(next)) {
      out += " ";
    }

    cur = closeIdx + close.length;
  }

  return out;
}

function addItalicDelimitedSpacing(text: string): string {
  let out = "";
  let cur = 0;

  while (cur < text.length) {
    const openIdx = findSingleStar(text, cur);
    if (openIdx < 0) {
      out += text.slice(cur);
      break;
    }

    const closeIdx = findSingleStar(text, openIdx + 1);
    if (closeIdx < 0) {
      out += text.slice(cur);
      break;
    }

    out += text.slice(cur, openIdx);

    const prev = openIdx > 0 ? text[openIdx - 1] : null;
    const next = closeIdx + 1 < text.length ? text[closeIdx + 1] : null;

    if (needsLeftSpace(prev, out)) {
      out += " ";
    }

    out += text.slice(openIdx, closeIdx + 1);

    if (needsRightSpace(next)) {
      out += " ";
    }

    cur = closeIdx + 1;
  }

  return out;
}

function findSingleStar(text: string, from: number): number {
  for (let i = from; i < text.length; i += 1) {
    if (text[i] !== "*") {
      continue;
    }

    if (text[i - 1] === "*" || text[i + 1] === "*") {
      continue;
    }

    return i;
  }

  return -1;
}

function needsLeftSpace(prev: string | null, out: string): boolean {
  if (!prev || !isCjkLike(prev)) {
    return false;
  }

  const last = out[out.length - 1] ?? "";
  return !isWs(last);
}

function needsRightSpace(next: string | null): boolean {
  if (!next || !isCjkLike(next)) {
    return false;
  }

  return !isWs(next);
}

function isCjkLike(ch: string | null): boolean {
  return isHan(ch) || isCnPunc(ch);
}

export { fmtMdLine };