/**
 * 纯文本标点后处理规则总线：
 * 这里只保留不在 `coreRule` 内处理的规则。
 */

import {
  cnDash,
  enBr2CnBr,
  enQ2CnQ,
  fixGuil,
  foldCnCommas,
  foldCnDots,
  foldCnEll,
} from "../punctuation";
import type { Rule } from "./types";

const punctRule: Rule = {
  id: "fixPunctuation",
  apply: (paras, opt) => {
    if (!opt.fixPunctuation) {
      return paras;
    }

    enQ2CnQ(opt.enQuotes2CnQuotes, paras);
    fixGuil(opt.guillemet, paras);
    cnDash(opt.chineseDash, paras);
    foldCnCommas(opt.chineseCommasFold, paras);
    foldCnDots(opt.chineseDotsFold, paras);
    foldCnEll(opt.chineseEllipsisesFold, paras);
    enBr2CnBr(opt.englishBrackets2ChineseBrackets, paras);
    return paras;
  },
};

export { punctRule };
