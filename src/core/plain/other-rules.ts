/**
 * 纯文本后处理规则：
 * 仅处理段间空行/自定义分隔符插入。
 */

import type { Paras, Rule } from "./types";

/** 段间空行/分隔符规则。 */
const lineGapRule: Rule = {
  id: "insertLineGap",
  apply: (paras, opt) => {
    const gap = opt.lineGap;
    if (gap === 0 || paras.length === 0) {
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
