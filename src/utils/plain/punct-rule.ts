import {
  bang,
  cnDash,
  colon,
  comma,
  dot,
  dotsToEll,
  enBr2CnBr,
  enQ2CnQ,
  fixGuil,
  foldCnCommas,
  foldCnDots,
  foldCnEll,
  qMark,
  semi,
} from "../punctuation";
import { Rule } from "./types";

const punctRule: Rule = {
  id: "fixPunctuation",
  apply: (paras, opt) => {
    if (!opt.fixPunctuation) {
      return paras;
    }

    comma(opt.comma, paras);
    dotsToEll(opt.dots2ellipsis, paras);
    dot(opt.dot, paras);
    colon(opt.colon, paras);
    qMark(opt.questionMark, paras);
    bang(opt.bang, paras);
    semi(opt.semicolon, paras);
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
