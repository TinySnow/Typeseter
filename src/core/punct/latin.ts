import { isHan } from "../chars";
import { mapP } from "./shared";
import type { Paras } from "./types";

/**
 * 英文括号转中文括号：
 * 仅当一对括号内部包含汉字时进行转换。
 */
function enBr2CnBr(on: boolean, paras: Paras): Paras {
  if (!on) {
    return paras;
  }

  return mapP(paras, (line) => {
    const chars = Array.from(line);
    const stack: number[] = [];

    for (let i = 0; i < chars.length; i += 1) {
      const ch = chars[i];
      if (ch === "(") {
        stack.push(i);
        continue;
      }

      if (ch !== ")" || stack.length === 0) {
        continue;
      }

      const open = stack.pop() as number;
      if (!hasHan(chars, open + 1, i)) {
        continue;
      }

      chars[open] = "（";
      chars[i] = "）";
    }

    return chars.join("");
  });
}

/**
 * 判断字符数组中指定范围内是否包含汉字
 * @param chars 字符数组
 * @param start 起始索引（包含）
 * @param end 结束索引（不包含）
 * @returns 如果指定范围内包含汉字，返回 true；否则返回 false
 */
function hasHan(chars: string[], start: number, end: number): boolean {
  for (let i = start; i < end; i += 1) {
    if (isHan(chars[i])) {
      return true;
    }
  }
  return false;
}

export { enBr2CnBr };