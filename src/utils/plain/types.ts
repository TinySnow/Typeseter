/**
 * 纯文本规则类型定义。
 */

import { Option } from "../../models/option";

type Paras = (string | null | undefined)[];

type Rule = {
  id: string;
  apply: (paras: Paras, opt: Option) => Paras;
};

export { Paras, Rule };
