/**
 * 纯文本排版公开入口。
 */

import { Option } from "./models/option";
import { fromPs, runPlain, toPs } from "./flow";

const typeset = (text: string, opt: Option): string => {
  const ps = toPs(text);
  const out = runPlain(ps, opt);
  return fromPs(out);
};

export { typeset };
