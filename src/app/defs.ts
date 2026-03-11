import type { BoolKey, SettingDef } from "./types";

const defs: SettingDef[] = [
  { key: "deleteBlankLines", label: "删除原始空行", containerId: "common-settings" },
  { key: "insertIndent", label: "插入段首缩进", containerId: "common-settings" },
  {
    key: "deleteSpaceInChineseCharacter",
    label: "删除汉字之间的空格",
    containerId: "common-settings",
  },
  {
    key: "insertSpaceInChineseAndEnglish",
    label: "中英文之间插入空格",
    containerId: "common-settings",
  },
  {
    key: "deleteSpaceBetweenChineseCharactersAndChinesePunctuations",
    label: "删除汉字和标点之间的空格",
    containerId: "common-settings",
  },
  { key: "comma", label: "逗号", containerId: "punctuation-settings" },
  { key: "dot", label: "句点", containerId: "punctuation-settings" },
  { key: "colon", label: "冒号", containerId: "punctuation-settings" },
  { key: "bang", label: "叹号", containerId: "punctuation-settings" },
  { key: "questionMark", label: "问号", containerId: "punctuation-settings" },
  { key: "semicolon", label: "分号", containerId: "punctuation-settings" },
  {
    key: "enQuotes2CnQuotes",
    label: "引号",
    containerId: "punctuation-settings",
  },
  {
    key: "englishBrackets2ChineseBrackets",
    label: "括号",
    containerId: "punctuation-settings",
  },
  { key: "guillemet", label: "书名号", containerId: "punctuation-settings" },
  { key: "chineseDash", label: "破折号", containerId: "punctuation-settings" },
  { key: "chineseCommasFold", label: "删除重复逗号", containerId: "punctuation-settings" },
  { key: "chineseDotsFold", label: "删除重复句号", containerId: "punctuation-settings" },
  {
    key: "chineseEllipsisesFold",
    label: "删除重复省略号",
    containerId: "punctuation-settings",
  },
  { key: "dots2ellipsis", label: "连续句点变为省略号", containerId: "punctuation-settings" },
  {
    key: "insertSpaceAfterPercentSign",
    label: "百分号后加空格",
    containerId: "other-settings",
  },
];

const mdOffKeys: ReadonlyArray<BoolKey> = ["deleteBlankLines", "insertIndent"];

export { defs, mdOffKeys };

