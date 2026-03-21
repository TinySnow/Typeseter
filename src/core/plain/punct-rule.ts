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

/**
 * 纯文本标点后处理规则总线
 * @description 应用各种标点处理规则
 * @property {string} id - 规则 ID
 * @property {function} apply - 应用规则的函数
 * @param {Paras} paras - 段落数组
 * @param {Option} opt - 排版选项
 * @returns {Paras} 处理后的段落数组
 * @description 处理逻辑：
 * 1. 如果 fixPunctuation 选项为 false，直接返回原数组
 * 2. 应用以下标点规则：
 *    - 英文引号转中文引号
 *    - 修复 guillemet（角引号）
 *    - 中文破折号处理
 *    - 中文逗号折叠
 *    - 中文点号折叠
 *    - 中文省略号折叠
 *    - 英文括号转中文括号
 */
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