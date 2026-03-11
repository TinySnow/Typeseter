import {
  supportsAdvancedRegex,
  HAN_CLASS,
  ASCII_WORD_CLASS,
  CHINESE_PUNCTUATION_CLASS as CN_PUNC_CLASS,
} from "../regex-support";
import { mapP } from "./shared";
import { Rule } from "./types";

const useAdv = supportsAdvancedRegex();

const RE_HAN_SP_ADV = useAdv
  ? new RegExp("(?<=\\p{Script=Han})\\s+(?=\\p{Script=Han})", "gu")
  : null;
const RE_HAN_PUNC_SP_ADV = useAdv
  ? new RegExp(
      "(?<=\\p{Script=Han})\\s+(?=[，。；‘’【】（）￥《》：“”…！？、~～·])|(?<=[，。；‘’【】（）￥《》：“”…！？、~～·])\\s+(?=\\p{Script=Han})",
      "gu"
    )
  : null;
const RE_CN_EN_SP_ADV = useAdv
  ? new RegExp("(?<=\\p{Script=Han})(?=[\\w])|(?<=[\\w])(?=\\p{Script=Han})", "gu")
  : null;

const RE_HAN_SP_FB = new RegExp(`(${HAN_CLASS})\\s+(${HAN_CLASS})`, "g");
const RE_HAN_PUNC_L_FB = new RegExp(`(${HAN_CLASS})\\s+(${CN_PUNC_CLASS})`, "g");
const RE_HAN_PUNC_R_FB = new RegExp(`(${CN_PUNC_CLASS})\\s+(${HAN_CLASS})`, "g");
const RE_CN_EN_L_FB = new RegExp(`(${HAN_CLASS})(${ASCII_WORD_CLASS})`, "g");
const RE_CN_EN_R_FB = new RegExp(`(${ASCII_WORD_CLASS})(${HAN_CLASS})`, "g");

const rmBlankRule: Rule = {
  id: "deleteBlankLines",
  apply: (paras, opt) => {
    if (!opt.deleteBlankLines) {
      return paras;
    }
    return paras.filter((s) => s !== null);
  },
};

const rmCnPuncSpRule: Rule = {
  id: "deleteSpaceBetweenChineseCharactersAndChinesePunctuations",
  apply: (paras, opt) => {
    const on = opt.deleteSpaceBetweenChineseCharactersAndChinesePunctuations;
    if (!on) {
      return paras;
    }

    if (RE_HAN_PUNC_SP_ADV) {
      return mapP(paras, (s) => s.replaceAll(RE_HAN_PUNC_SP_ADV, ""));
    }

    return mapP(paras, (s) => s.replace(RE_HAN_PUNC_L_FB, "$1$2").replace(RE_HAN_PUNC_R_FB, "$1$2"));
  },
};

const rmCnSpRule: Rule = {
  id: "deleteSpaceInChineseCharacter",
  apply: (paras, opt) => {
    const on = opt.deleteSpaceInChineseCharacter;
    if (!on) {
      return paras;
    }

    if (RE_HAN_SP_ADV) {
      return mapP(paras, (s) => s.replaceAll(RE_HAN_SP_ADV, ""));
    }

    return mapP(paras, (s) => s.replace(RE_HAN_SP_FB, "$1$2"));
  },
};

const insIndentRule: Rule = {
  id: "insertIndent",
  apply: (paras, opt) => {
    if (!opt.insertIndent) {
      return paras;
    }
    return mapP(paras, (s) => s.replace(/^/, "　　"));
  },
};

const insCnEnSpRule: Rule = {
  id: "insertSpaceInChineseAndEnglish",
  apply: (paras, opt) => {
    const on = opt.insertSpaceInChineseAndEnglish;
    if (!on) {
      return paras;
    }

    if (RE_CN_EN_SP_ADV) {
      return mapP(paras, (s) => s.replaceAll(RE_CN_EN_SP_ADV, " "));
    }

    return mapP(paras, (s) => s.replace(RE_CN_EN_L_FB, "$1 $2").replace(RE_CN_EN_R_FB, "$1 $2"));
  },
};

export { rmBlankRule, rmCnPuncSpRule, rmCnSpRule, insIndentRule, insCnEnSpRule };

