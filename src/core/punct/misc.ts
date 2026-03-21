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

/**
 * 处理中文破折号
 * @param on 是否启用处理
 * @param paras 段落数组
 * @returns 处理后的段落数组
 * @description 将连续的破折号、波浪号等转换为中文破折号
 */
function cnDash(on: boolean, paras: Paras): Paras {
  if (!on) {
    return paras;
  }
  return mapP(paras, (s) => s.replaceAll(RE_CN_DASH, "——"));
}

/**
 * 折叠中文点号
 * @param on 是否启用处理
 * @param paras 段落数组
 * @returns 处理后的段落数组
 * @description 将连续的中文点号折叠为中文省略号
 */
function foldCnDots(on: boolean, paras: Paras): Paras {
  if (!on) {
    return paras;
  }
  return mapP(paras, (s) => s.replaceAll(RE_CN_DOTS_FOLD, "……"));
}

/**
 * 折叠中文逗号
 * @param on 是否启用处理
 * @param paras 段落数组
 * @returns 处理后的段落数组
 * @description 将连续的中文逗号折叠为单个中文逗号
 */
function foldCnCommas(on: boolean, paras: Paras): Paras {
  if (!on) {
    return paras;
  }
  return mapP(paras, (s) => s.replaceAll(RE_CN_COMMAS_FOLD, "，"));
}

/**
 * 折叠中文省略号
 * @param on 是否启用处理
 * @param paras 段落数组
 * @returns 处理后的段落数组
 * @description 将连续的中文省略号折叠为单个中文省略号
 */
function foldCnEll(on: boolean, paras: Paras): Paras {
  if (!on) {
    return paras;
  }
  return mapP(paras, (s) => s.replaceAll(RE_CN_ELL_FOLD, "……"));
}

/**
 * 修复 guillemet（角引号）
 * @param on 是否启用处理
 * @param paras 段落数组
 * @returns 处理后的段落数组
 * @description 将英文角引号（<< >> 或 « »）转换为中文书名号（《 》）
 */
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