import { Paras } from "./types";

type QState = {
  dOpen: boolean;
  sOpen: boolean;
};

const OPEN_PREV = new Set<string>([
  "(",
  "[",
  "{",
  "<",
  "（",
  "【",
  "《",
  "「",
  "『",
  "“",
  "‘",
  ":",
  "：",
  ",",
  "，",
  ";",
  "；",
  ".",
  "。",
  "!",
  "！",
  "?",
  "？",
  "、",
  "-",
  "—",
]);

const CLOSE_NEXT = new Set<string>([
  ")",
  "]",
  "}",
  ">",
  "）",
  "】",
  "》",
  "」",
  "』",
  ",",
  "，",
  ".",
  "。",
  ";",
  "；",
  ":",
  "：",
  "!",
  "！",
  "?",
  "？",
  "、",
  "…",
  "—",
  "”",
  "’",
]);

function enQ2CnQ(on: boolean, paras: Paras): Paras {
  if (!on) {
    return paras;
  }

  const st: QState = { dOpen: false, sOpen: false };

  for (let i = 0; i < paras.length; i += 1) {
    const line = paras[i];
    if (line != null) {
      paras[i] = fixLineQuotes(line, st);
    }
  }

  return paras;
}

function fixLineQuotes(line: string, st: QState): string {
  let out = "";

  for (let i = 0; i < line.length; i += 1) {
    const ch = line[i];

    if (ch === '"') {
      const prev = prevNonWs(line, i - 1);
      const next = nextNonWs(line, i + 1);
      const open = pickOpen(prev, next, st.dOpen);
      out += open ? "“" : "”";
      st.dOpen = open;
      continue;
    }

    if (ch === "'") {
      const prevRaw = i > 0 ? line[i - 1] : null;
      const nextRaw = i + 1 < line.length ? line[i + 1] : null;

      // Keep apostrophes inside ASCII words, e.g. don't / rock'n'roll.
      if (isAsciiWord(prevRaw) && isAsciiWord(nextRaw)) {
        out += ch;
        continue;
      }

      const prev = prevNonWs(line, i - 1);
      const next = nextNonWs(line, i + 1);
      const open = pickOpen(prev, next, st.sOpen);
      out += open ? "‘" : "’";
      st.sOpen = open;
      continue;
    }

    out += ch;
  }

  return out;
}

function pickOpen(prev: string | null, next: string | null, openState: boolean): boolean {
  const openByCtx = isOpenCtx(prev);
  const closeByCtx = isCloseCtx(next);

  if (openByCtx && !closeByCtx) {
    return true;
  }

  if (closeByCtx && !openByCtx) {
    return false;
  }

  return !openState;
}

function isOpenCtx(prev: string | null): boolean {
  if (prev == null) {
    return true;
  }
  return OPEN_PREV.has(prev);
}

function isCloseCtx(next: string | null): boolean {
  if (next == null) {
    return true;
  }
  return CLOSE_NEXT.has(next);
}

function prevNonWs(text: string, from: number): string | null {
  for (let i = from; i >= 0; i -= 1) {
    const ch = text[i];
    if (!isWs(ch)) {
      return ch;
    }
  }
  return null;
}

function nextNonWs(text: string, from: number): string | null {
  for (let i = from; i < text.length; i += 1) {
    const ch = text[i];
    if (!isWs(ch)) {
      return ch;
    }
  }
  return null;
}

function isWs(ch: string): boolean {
  return ch === " " || ch === "\t" || ch === "\n" || ch === "\r";
}

function isAsciiWord(ch: string | null): boolean {
  if (!ch || ch.length !== 1) {
    return false;
  }

  const code = ch.charCodeAt(0);
  return (
    (code >= 48 && code <= 57) ||
    (code >= 65 && code <= 90) ||
    (code >= 97 && code <= 122)
  );
}

export { enQ2CnQ };
