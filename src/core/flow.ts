/**
 * 纯文本排版流程入口：
 * - 维护规则执行顺序；
 * - 暴露段落数组与字符串之间的转换函数。
 */

import type { Option } from "./models/option";
import { lineGapRule } from "./plain/other-rules";
import { punctRule } from "./plain/punct-rule";
import { fromParas as fromPs, toParas as toPs } from "./plain/shared";
import { coreRule, insIndentRule, rmBlankRule } from "./plain/space-rules";
import type { Paras, Rule } from "./plain/types";

/**
 * 纯文本排版规则总线。
 * 执行顺序即语义顺序，调整顺序会直接改变排版结果。
 */
const rules: ReadonlyArray<Rule> = [
  rmBlankRule,
  insIndentRule,
  coreRule,
  punctRule,
  lineGapRule,
];

/**
 * 执行纯文本排版规则
 * @param paras 段落数组
 * @param opt 排版选项
 * @returns 经过所有规则处理后的段落数组
 * @description 执行顺序：
 * 1. rmBlankRule - 移除空白
 * 2. insIndentRule - 插入缩进
 * 3. coreRule - 核心规则
 * 4. punctRule - 标点规则
 * 5. lineGapRule - 行间距规则
 */
function runPlain(paras: Paras, opt: Option): Paras {
  let curr = paras;
  for (const rule of rules) {
    curr = rule.apply(curr, opt);
  }
  return curr;
}

export { runPlain, toPs, fromPs };