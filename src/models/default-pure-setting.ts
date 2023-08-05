import { Option } from "@/models/option";

const defaultPTS: Option = {
  insertIndent: true,
  lineGap: 0,
  deleteBlankLines: true,
  deleteSpaceInChineseCharacter: true,
  insertSpaceInChineseAndEnglish: true,

  fixPunctuation: true,
  comma: true,
  dots2ellipsis: true,
  dot: true,
  colon: true,
  bang: true,
  questionMark: true,
  semicolon: true,
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
