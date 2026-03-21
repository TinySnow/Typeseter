/**
 * 引号转换：英文单双引号 -> 中文引号。
 *
 * 设计要点：
 * - 使用跨段状态，支持“长对话跨多段只在最后一段闭合”的中文写法；
 * - 对 ASCII 单词内部撇号（don't / rock'n'roll）保持不变；
 * - 结合前后文标点启发式判定开/闭引号。
 */

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

/**
 * 英文引号转中文引号
 * @param on 是否启用转换
 * @param paras 段落数组
 * @returns 转换后的段落数组
 * @description 处理逻辑：
 * 1. 如果未启用转换，直接返回原数组
 * 2. 初始化引号状态
 * 3. 遍历每个段落，对非空段落调用 fixLineQuotes 函数
 * 4. 返回处理后的段落数组
 */
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

/**
 * 修复行中的引号
 * @param line 要处理的行
 * @param st 引号状态
 * @returns 修复后的行
 * @description 处理逻辑：
 * 1. 遍历行中的每个字符
 * 2. 处理双引号：根据上下文决定使用开引号还是闭引号
 * 3. 处理单引号：
 *    - 如果是 ASCII 单词内部的撇号，保持不变
 *    - 否则根据上下文决定使用开引号还是闭引号
 * 4. 其他字符保持不变
 */
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

      // ASCII 单词内部的撇号不转换。
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

/**
 * 决定是使用开引号还是闭引号
 * @param prev 前一个非空白字符
 * @param next 后一个非空白字符
 * @param openState 当前的引号状态
 * @returns 如果应该使用开引号，返回 true；否则返回 false
 * @description 判断逻辑：
 * 1. 检查前一个字符是否是开引号上下文
 * 2. 检查后一个字符是否是闭引号上下文
 * 3. 根据上下文决定使用开引号还是闭引号
 * 4. 如果上下文不明确，根据当前引号状态决定
 */
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

/**
 * 判断是否是开引号上下文
 * @param prev 前一个非空白字符
 * @returns 如果是开引号上下文，返回 true；否则返回 false
 * @description 判断逻辑：
 * 1. 如果前一个字符不存在，是开引号上下文
 * 2. 如果前一个字符在 OPEN_PREV 集合中，是开引号上下文
 * 3. 否则不是开引号上下文
 */
function isOpenCtx(prev: string | null): boolean {
  if (prev == null) {
    return true;
  }
  return OPEN_PREV.has(prev);
}

/**
 * 判断是否是闭引号上下文
 * @param next 后一个非空白字符
 * @returns 如果是闭引号上下文，返回 true；否则返回 false
 * @description 判断逻辑：
 * 1. 如果后一个字符不存在，是闭引号上下文
 * 2. 如果后一个字符在 CLOSE_NEXT 集合中，是闭引号上下文
 * 3. 否则不是闭引号上下文
 */
function isCloseCtx(next: string | null): boolean {
  if (next == null) {
    return true;
  }
  return CLOSE_NEXT.has(next);
}

/**
 * 获取前一个非空白字符
 * @param text 要检查的文本
 * @param from 起始位置
 * @returns 前一个非空白字符，如果不存在则返回 null
 */
function prevNonWs(text: string, from: number): string | null {
  for (let i = from; i >= 0; i -= 1) {
    const ch = text[i];
    if (!isWs(ch)) {
      return ch;
    }
  }
  return null;
}

/**
 * 获取后一个非空白字符
 * @param text 要检查的文本
 * @param from 起始位置
 * @returns 后一个非空白字符，如果不存在则返回 null
 */
function nextNonWs(text: string, from: number): string | null {
  for (let i = from; i < text.length; i += 1) {
    const ch = text[i];
    if (!isWs(ch)) {
      return ch;
    }
  }
  return null;
}

/**
 * 判断是否是空白字符
 * @param ch 要判断的字符
 * @returns 如果是空白字符，返回 true；否则返回 false
 * @description 判断逻辑：空格、制表符、换行符、回车符都是空白字符
 */
function isWs(ch: string): boolean {
  return ch === " " || ch === "\t" || ch === "\n" || ch === "\r";
}

/**
 * 判断是否是 ASCII 单词字符
 * @param ch 要判断的字符
 * @returns 如果是 ASCII 单词字符，返回 true；否则返回 false
 * @description 判断逻辑：数字（0-9）、大写字母（A-Z）、小写字母（a-z）都是 ASCII 单词字符
 */
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