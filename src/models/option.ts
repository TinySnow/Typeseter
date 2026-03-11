interface Option {
  insertIndent: boolean;

  lineGap: number;
  customedLineBreaker: string;

  deleteBlankLines: boolean;

  deleteSpaceBetweenChineseCharactersAndChinesePunctuations: boolean;

  deleteSpaceInChineseCharacter: boolean;

  insertSpaceInChineseAndEnglish: boolean;

  fixPunctuation: boolean;
  comma: boolean;
  dots2ellipsis: boolean;
  dot: boolean;
  colon: boolean;
  bang: boolean;
  questionMark: boolean;
  semicolon: boolean;
  enQuotes2CnQuotes: boolean;
  guillemet: boolean;
  chineseDash: boolean;
  chineseCommasFold: boolean;
  chineseDotsFold: boolean;
  chineseEllipsisesFold: boolean;
  englishBrackets2ChineseBrackets: boolean;

  fixOthers: boolean;
  insertSpaceAfterPercentSign: boolean;
}

export { Option };
