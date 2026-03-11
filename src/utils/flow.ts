import { Option } from "../models/option";
import { lineGapRule, otherRule } from "./plain/other-rules";
import { punctRule } from "./plain/punct-rule";
import { fromParas as fromPs, toParas as toPs } from "./plain/shared";
import { insCnEnSpRule, insIndentRule, rmBlankRule, rmCnPuncSpRule, rmCnSpRule } from "./plain/space-rules";
import { Paras, Rule } from "./plain/types";

const rules: ReadonlyArray<Rule> = [
  rmBlankRule,
  rmCnPuncSpRule,
  rmCnSpRule,
  insIndentRule,
  punctRule,
  insCnEnSpRule,
  lineGapRule,
  otherRule,
];

function runPlain(paras: Paras, opt: Option): Paras {
  let curr = paras;
  for (const rule of rules) {
    curr = rule.apply(curr, opt);
  }
  return curr;
}

export {
  runPlain,
  toPs,
  fromPs,
  rules,
  runPlain as applyPlainTextRules,
  toPs as toParagraphs,
  fromPs as fromParagraphs,
  rules as PLAIN_TEXT_RULES,
};
