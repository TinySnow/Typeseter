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

function runPlain(paras: Paras, opt: Option): Paras {
  let curr = paras;
  for (const rule of rules) {
    curr = rule.apply(curr, opt);
  }
  return curr;
}

export { runPlain, toPs, fromPs };
