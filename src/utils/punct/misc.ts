import { mapP } from "./shared";
import type { Paras } from "./types";

/**
 * 正则型“后处理”规则：
 * 这类规则模式非常稳定，使用正则表达式更直接。
 */
const RE_CN_DASH = /(?:-\s*){2,}|(?:~\s*){2,}|(?:～\s*){2,}|(?:－\s*){2,}|`{2,}/g;
const RE_CN_DOTS_FOLD = /。{2,}/g;
const RE_CN_COMMAS_FOLD = /，{2,}/g;
const RE_CN_ELL_FOLD = /…{3,}/g;
const RE_GUIL_L = /<<|«/g;
const RE_GUIL_R = />>|»/g;

function cnDash(on: boolean, paras: Paras): Paras {
  if (!on) {
    return paras;
  }
  return mapP(paras, (s) => s.replaceAll(RE_CN_DASH, "——"));
}

function foldCnDots(on: boolean, paras: Paras): Paras {
  if (!on) {
    return paras;
  }
  return mapP(paras, (s) => s.replaceAll(RE_CN_DOTS_FOLD, "……"));
}

function foldCnCommas(on: boolean, paras: Paras): Paras {
  if (!on) {
    return paras;
  }
  return mapP(paras, (s) => s.replaceAll(RE_CN_COMMAS_FOLD, "，"));
}

function foldCnEll(on: boolean, paras: Paras): Paras {
  if (!on) {
    return paras;
  }
  return mapP(paras, (s) => s.replaceAll(RE_CN_ELL_FOLD, "……"));
}

function fixGuil(on: boolean, paras: Paras): Paras {
  if (!on) {
    return paras;
  }

  return mapP(paras, (s) => {
    const leftFixed = s.replaceAll(RE_GUIL_L, "《");
    return leftFixed.replaceAll(RE_GUIL_R, "》");
  });
}

export { cnDash, foldCnDots, foldCnCommas, foldCnEll, fixGuil };
