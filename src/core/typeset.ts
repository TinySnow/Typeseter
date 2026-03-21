/**
 * 纯文本排版公开入口。
 */

import { Option } from "./models/option";
import { fromPs, runPlain, toPs } from "./flow";

/**
 * 纯文本排版函数
 * @param text 要排版的文本
 * @param opt 排版选项
 * @returns 排版后的文本
 * @description 处理过程：
 * 1. 将文本转换为段落数组
 * 2. 执行纯文本排版规则
 * 3. 将段落数组转换回文本
 */
const typeset = (text: string, opt: Option): string => {
  const ps = toPs(text);
  const out = runPlain(ps, opt);
  return fromPs(out);
};

export { typeset };