/**
 * 字符分类工具：
 * 1) 统一处理文本扫描器里“字符类型判断”的口径，避免每个规则各写一套正则。
 * 2) 这些函数全部是 O(1) 判定，适合在逐字符扫描中高频调用。
 */

/**
 * 需要当作“中文标点”处理的一组字符。
 * 这里的集合对应项目现有规则范围，而不是完整 Unicode 标点全集。
 */
const CN_PUNC_SET = new Set<string>([
  "，",
  "。",
  "；",
  "‘",
  "’",
  "【",
  "】",
  "（",
  "）",
  "￥",
  "《",
  "》",
  "：",
  "“",
  "”",
  "…",
  "！",
  "？",
  "、",
  "~",
  "～",
  "·",
]);

/**
 * 判断是否属于常用 CJK 汉字区段。
 * 与旧版 fallback 正则范围保持一致：
 * - CJK Ext A: 3400-4DBF
 * - CJK Unified: 4E00-9FFF
 * - CJK Compatibility Ideographs: F900-FAFF
 */
function isHan(ch: string | null): boolean {
  if (!ch || ch.length !== 1) {
    return false;
  }

  const code = ch.charCodeAt(0);
  return (
    (code >= 0x3400 && code <= 0x4dbf) ||
    (code >= 0x4e00 && code <= 0x9fff) ||
    (code >= 0xf900 && code <= 0xfaff)
  );
}

/**
 * 判断是否是 ASCII 词字符：A-Z / a-z / 0-9 / _。
 * 用于“中英文边界插空格”等规则，保持与历史实现一致。
 */
function isAsciiWord(ch: string | null): boolean {
  if (!ch || ch.length !== 1) {
    return false;
  }

  const code = ch.charCodeAt(0);
  return (
    (code >= 48 && code <= 57) ||
    (code >= 65 && code <= 90) ||
    (code >= 97 && code <= 122) ||
    code === 95
  );
}

/** 判断是否属于项目定义的中文标点集合。 */
function isCnPunc(ch: string | null): boolean {
  if (!ch || ch.length !== 1) {
    return false;
  }
  return CN_PUNC_SET.has(ch);
}

/**
 * 空白字符判定。
 * 特别包含了全角空格（U+3000）和 NBSP（U+00A0），
 * 以覆盖中文文本常见输入场景。
 */
function isWs(ch: string | null): boolean {
  if (!ch || ch.length !== 1) {
    return false;
  }

  return (
    ch === " " ||
    ch === "\t" ||
    ch === "\n" ||
    ch === "\r" ||
    ch === "\v" ||
    ch === "\f" ||
    ch === "\u00A0" ||
    ch === "\u3000"
  );
}

/**
 * 从下标 from 开始，返回第一个非空白字符；找不到返回 null。
 * 注意：这里只返回字符，不返回下标，适合做上下文判定。
 */
function nextNonWs(text: string, from: number): string | null {
  for (let i = from; i < text.length; i += 1) {
    if (!isWs(text[i])) {
      return text[i];
    }
  }
  return null;
}

/**
 * 从下标 from 开始跳过连续空白，返回跳过后的下标。
 * 常用于“替换标点后吞掉其后多余空白”的场景。
 */
function skipWs(text: string, from: number): number {
  let i = from;
  while (i < text.length && isWs(text[i])) {
    i += 1;
  }
  return i;
}

/** 判断是否十进制数字字符。 */
function isDigit(ch: string | null): boolean {
  if (!ch || ch.length !== 1) {
    return false;
  }

  const code = ch.charCodeAt(0);
  return code >= 48 && code <= 57;
}

export { isHan, isAsciiWord, isCnPunc, isWs, nextNonWs, skipWs, isDigit };
