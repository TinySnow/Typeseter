/**
 * 纯文本后处理规则：
 * 仅处理段间空行/自定义分隔符插入。
 */

import type { Paras, Rule } from "./types";

/**
 * 段间空行/分隔符规则
 * @description 处理段落之间的空行或自定义分隔符插入
 * @property {string} id - 规则 ID
 * @property {function} apply - 应用规则的函数
 * @param {Paras} paras - 段落数组
 * @param {Option} opt - 排版选项
 * @returns {Paras} 处理后的段落数组
 * @description 处理逻辑：
 * 1. 如果 lineGap 为 0 或段落数组为空，直接返回原数组
 * 2. 如果 lineGap 为 -1，使用自定义分隔符
 * 3. 否则，在段落之间插入指定数量的空行
 */
const lineGapRule: Rule = {
  id: "insertLineGap",
  apply: (paras, opt) => {
    const gap = opt.lineGap;
    if (gap === 0 || paras.length === 0 || opt.preserveBlankLines) {
      return paras;
    }

    const useCustom = gap === -1;
    const fillVal = useCustom ? opt.customedLineBreaker : "";
    const fillCnt = useCustom ? 1 : gap;
    const out: Paras = [];

    for (let i = 0; i < paras.length; i += 1) {
      out.push(paras[i]);
      if (i === paras.length - 1) {
        continue;
      }
      for (let j = 0; j < fillCnt; j += 1) {
        out.push(fillVal);
      }
    }

    return out;
  },
};

export { lineGapRule };