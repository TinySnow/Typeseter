/**
 * 默认配置：用于首次加载与“重置设置”。
 */

import { Option } from "./option";

const defaultPTS: Option = {
  insertIndent: true,

  lineGap: 0,
  customedLineBreaker: "",

  deleteBlankLines: true,
  deleteSpaceInChineseCharacter: true,
  insertSpaceInChineseAndEnglish: true,
  deleteSpaceBetweenChineseCharactersAndChinesePunctuations: true,

  fixPunctuation: true,
  comma: true,
  dots2ellipsis: true,
  dot: true,
  colon: true,
  bang: true,
  questionMark: true,
  semicolon: true,
  enQuotes2CnQuotes: true,
  guillemet: true,
  chineseDash: true,
  chineseCommasFold: true,
  chineseDotsFold: true,
  chineseEllipsisesFold: true,
  englishBrackets2ChineseBrackets: true,

  fixOthers: true,
  insertSpaceAfterPercentSign: true,
};

export { defaultPTS };
