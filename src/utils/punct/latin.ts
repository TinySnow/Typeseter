import { supportsAdvancedRegex, HAN_CLASS } from "../regex-support";
import { fixLat, mapP } from "./shared";
import { Paras } from "./types";

const useAdv = supportsAdvancedRegex();

const RE_DOT_LIST_FIX = /^(\s*)(\d+(?:\.\d+)*)。/g;

const RE_COMMA_ADV = useAdv
  ? new RegExp("(?<=\\p{Script=Han}),\\s*|(?<=.),\\s*(?=\\p{Script=Han})", "gu")
  : null;
const RE_DOT_ADV = useAdv
  ? new RegExp("(?<=\\p{Script=Han})\\.\\s*|(?<=.)\\.\\s*(?=\\p{Script=Han})", "gu")
  : null;
const RE_COLON_ADV = useAdv
  ? new RegExp("(?<=\\p{Script=Han}):\\s*|(?<=.):\\s*(?=\\p{Script=Han})", "gu")
  : null;
const RE_Q_ADV = useAdv
  ? new RegExp("(?<=\\p{Script=Han})\\?\\s*|(?<=.)\\?\\s*(?=\\p{Script=Han})", "gu")
  : null;
const RE_BANG_ADV = useAdv
  ? new RegExp("(?<=\\p{Script=Han})!\\s*|(?<=.)!\\s*(?=\\p{Script=Han})", "gu")
  : null;
const RE_SEMI_ADV = useAdv
  ? new RegExp("(?<=\\p{Script=Han});\\s*|(?<=.);\\s*(?=\\p{Script=Han})", "gu")
  : null;
const RE_EN_BR_ADV = useAdv
  ? new RegExp("\\(([^()]*\\p{Script=Han}+[^()]*)\\)", "gu")
  : null;

const RE_COMMA_L_FB = new RegExp(`(${HAN_CLASS}),\\s*`, "g");
const RE_COMMA_R_FB = new RegExp(`,\\s*(${HAN_CLASS})`, "g");
const RE_DOT_L_FB = new RegExp(`(${HAN_CLASS})\\.\\s*`, "g");
const RE_DOT_R_FB = new RegExp(`\\.\\s*(${HAN_CLASS})`, "g");
const RE_COLON_L_FB = new RegExp(`(${HAN_CLASS}):\\s*`, "g");
const RE_COLON_R_FB = new RegExp(`:\\s*(${HAN_CLASS})`, "g");
const RE_Q_L_FB = new RegExp(`(${HAN_CLASS})\\?\\s*`, "g");
const RE_Q_R_FB = new RegExp(`\\?\\s*(${HAN_CLASS})`, "g");
const RE_BANG_L_FB = new RegExp(`(${HAN_CLASS})!\\s*`, "g");
const RE_BANG_R_FB = new RegExp(`!\\s*(${HAN_CLASS})`, "g");
const RE_SEMI_L_FB = new RegExp(`(${HAN_CLASS});\\s*`, "g");
const RE_SEMI_R_FB = new RegExp(`;\\s*(${HAN_CLASS})`, "g");
const RE_EN_BR_FB = new RegExp(`\\(([^()]*${HAN_CLASS}+[^()]*)\\)`, "g");

function comma(on: boolean, paras: Paras): Paras {
  return fixLat(on, paras, "，", RE_COMMA_ADV, RE_COMMA_L_FB, RE_COMMA_R_FB);
}

function dot(on: boolean, paras: Paras): Paras {
  if (!on) {
    return paras;
  }

  if (RE_DOT_ADV) {
    mapP(paras, (s) => s.replaceAll(RE_DOT_ADV, "。"));
  } else {
    mapP(paras, (s) => s.replace(RE_DOT_L_FB, "$1。").replace(RE_DOT_R_FB, "。$1"));
  }

  return mapP(paras, (s) => s.replaceAll(RE_DOT_LIST_FIX, "$1$2. "));
}

function colon(on: boolean, paras: Paras): Paras {
  return fixLat(on, paras, "：", RE_COLON_ADV, RE_COLON_L_FB, RE_COLON_R_FB);
}

function qMark(on: boolean, paras: Paras): Paras {
  return fixLat(on, paras, "？", RE_Q_ADV, RE_Q_L_FB, RE_Q_R_FB);
}

function bang(on: boolean, paras: Paras): Paras {
  return fixLat(on, paras, "！", RE_BANG_ADV, RE_BANG_L_FB, RE_BANG_R_FB);
}

function semi(on: boolean, paras: Paras): Paras {
  return fixLat(on, paras, "；", RE_SEMI_ADV, RE_SEMI_L_FB, RE_SEMI_R_FB);
}

function enBr2CnBr(on: boolean, paras: Paras): Paras {
  if (!on) {
    return paras;
  }

  if (RE_EN_BR_ADV) {
    return mapP(paras, (s) => s.replaceAll(RE_EN_BR_ADV, "（$1）"));
  }

  return mapP(paras, (s) => s.replaceAll(RE_EN_BR_FB, "（$1）"));
}

export { comma, dot, colon, qMark, bang, semi, enBr2CnBr };
