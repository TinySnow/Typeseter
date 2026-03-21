import { isHan } from "../chars";
import { mapP } from "./shared";
import type { Paras } from "./types";

/**
 * 英文括号转中文括号
 * @param on 是否启用转换
 * @param paras 段落数组
 * @returns 转换后的段落数组
 * @description 处理逻辑：
 * 1. 如果未启用转换，直接返回原数组
 * 2. 遍历每个段落，对每个段落执行以下操作：
 *    - 将段落转换为字符数组
 *    - 使用栈记录左括号的位置
 *    - 当遇到右括号时，检查对应左括号内是否包含汉字
 *    - 如果包含汉字，将括号转换为中文括号
 *    - 将字符数组重新组合为字符串
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