import { insertSpaceAfterPercentSign as insSpAfterPct } from "../optional";
import { Paras, Rule } from "./types";

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

const otherRule: Rule = {
  id: "fixOthers",
  apply: (paras, opt) => {
    if (!opt.fixOthers) {
      return paras;
    }

    insSpAfterPct(opt.insertSpaceAfterPercentSign, paras);
    return paras;
  },
};

export { lineGapRule, otherRule };
