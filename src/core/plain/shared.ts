/**
 * 纯文本规则公共工具：
 * - `mapP`：对非空段原地映射；
 * - `toParas`：把文本转为段数组（空行记为 null）；
 * - `fromParas`：段数组还原为文本。
 */

import { Paras } from "./types";

/**
 * 对非空段原地映射
 * @param paras 段落数组，元素为 string | null | undefined
 * @param fn 映射函数，接收字符串参数并返回处理后的字符串
 * @returns 映射后的段落数组（原地修改）
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

/**
 * 把文本转为段数组（空行记为 null）
 * @param text 输入文本
 * @returns 段落数组，空行为 null，非空行为去除首尾空格的字符串
 */
function toParas(text: string): Paras {
  const lines = text.split("\n");
  const paras: Paras = new Array(lines.length);

  for (let i = 0; i < lines.length; i += 1) {
    const trimmed = lines[i].trim();
    paras[i] = trimmed.length === 0 ? null : trimmed;
  }

  return paras;
}

/**
 * 段数组还原为文本
 * @param paras 段落数组
 * @returns 还原后的文本
 */
function fromParas(paras: Paras): string {
  return paras.join("\n");
}

export { mapP, toParas, fromParas };