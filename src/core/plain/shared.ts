/**
 * 纯文本规则公共工具：
 * - `mapP`：对非空段原地映射；
 * - `toParas`：把文本转为段数组（空行记为 null）；
 * - `fromParas`：段数组还原为文本。
 */

import { Paras } from "./types";

function mapP(paras: Paras, fn: (s: string) => string): Paras {
  for (let i = 0; i < paras.length; i += 1) {
    const s = paras[i];
    if (s != null) {
      paras[i] = fn(s);
    }
  }
  return paras;
}

function toParas(text: string): Paras {
  const lines = text.split("\n");
  const paras: Paras = new Array(lines.length);

  for (let i = 0; i < lines.length; i += 1) {
    const trimmed = lines[i].trim();
    paras[i] = trimmed.length === 0 ? null : trimmed;
  }

  return paras;
}

function fromParas(paras: Paras): string {
  return paras.join("\n");
}

export { mapP, toParas, fromParas };
