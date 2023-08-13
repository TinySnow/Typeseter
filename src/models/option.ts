interface Option {
  insertIndent: Boolean;
  lineGap: number;
  deleteBlankLines: Boolean;
  deleteSpaceBetweenChineseCharactersAndChinesePunctuations: Boolean;
  deleteSpaceInChineseCharacter: Boolean;
  insertSpaceInChineseAndEnglish: Boolean;

  fixPunctuation: Boolean;
  comma: Boolean;
  dots2ellipsis: Boolean;
  dot: Boolean;
  colon: Boolean;
  bang: Boolean;
  questionMark: Boolean;
  semicolon: Boolean;
  guillemet: Boolean;
  chineseDash: Boolean;
  chineseCommasFold: Boolean;
  chineseDotsFold: Boolean;
  chineseEllipsisesFold: Boolean;
  englishBrackets2ChineseBrackets: Boolean;

  fixOthers: Boolean;
  insertSpaceAfterPercentSign: Boolean;
}

export { Option };
