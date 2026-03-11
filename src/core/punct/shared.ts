/**
 * 标点规则公共工具：对段落数组执行原地 map。
 */

import { Paras } from "./types";

/**
 * 对段落数组执行原地 map。
 * - 只处理非空段，避免无意义字符串创建；
 * - 规则链按顺序复用同一份数组，减少内存抖动。
 */
function mapP(paras: Paras, fn: (s: string) => string): Paras {
  for (let i = 0; i < paras.length; i += 1) {
    const s = paras[i];
    if (s != null) {
      paras[i] = fn(s);
    }
  }
  return paras;
}

export { mapP };
