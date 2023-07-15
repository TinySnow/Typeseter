interface Option {
  insertIndent: Boolean;
  lineGap: "none" | "one" | "two";
  fixPunctuation: Boolean;
  deleteBlankLines: Boolean;
  deleteSpaceInChineseCharacter: Boolean;
  insertSpaceInChineseAndEnglish: Boolean;
}

export { Option };
