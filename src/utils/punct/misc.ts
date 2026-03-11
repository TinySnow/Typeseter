import { mapP } from "./shared";
import { Paras } from "./types";

const RE_DOTS_TO_ELL = /\.{3,}/g;
const RE_CN_DASH = /(?:-\s*){2,}|(?:~\s*){2,}|(?:～\s*){2,}|(?:－\s*){2,}|`{2,}/g;
const RE_CN_DOTS_FOLD = /。{2,}/g;
const RE_CN_COMMAS_FOLD = /，{2,}/g;
const RE_CN_ELL_FOLD = /…{3,}/g;
const RE_GUIL_L = /<<|«/g;
const RE_GUIL_R = />>|»/g;

function dotsToEll(on: boolean, paras: Paras): Paras {
  if (!on) {
    return paras;
  }
  return mapP(paras, (s) => s.replaceAll(RE_DOTS_TO_ELL, "……"));
}

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

export { dotsToEll, cnDash, foldCnDots, foldCnCommas, foldCnEll, fixGuil };
