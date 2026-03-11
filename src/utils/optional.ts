import { isHan } from "./chars";

/**
 * 可选规则：在百分号后补一个空格。
 * 行为保持与历史版本一致：仅当下一个字符是汉字时补空格。
 */
function insertSpaceAfterPercentSign(
  enabled: boolean,
  origin: (string | null | undefined)[]
): (string | null | undefined)[] {
  if (!enabled) {
    return origin;
  }

  for (let i = 0; i < origin.length; i += 1) {
    const s = origin[i];
    if (s != null) {
      origin[i] = insertSpaceAfterPctInLine(s);
    }
  }

  return origin;
}

/**
 * 单行处理：扫描到 "%" 时，若下一个字符是汉字则插入半角空格。
 * 例如："上涨5%利润" -> "上涨5% 利润"
 */
function insertSpaceAfterPctInLine(line: string): string {
  if (!line.includes("%")) {
    return line;
  }

  let out = "";
  for (let i = 0; i < line.length; i += 1) {
    const ch = line[i];
    out += ch;

    if (ch !== "%") {
      continue;
    }

    const next = i + 1 < line.length ? line[i + 1] : null;
    if (isHan(next)) {
      out += " ";
    }
  }

  return out;
}

export { insertSpaceAfterPercentSign };
