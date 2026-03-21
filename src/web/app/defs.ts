/**
 * 设置项定义：
 * - 声明每个开关对应的 UI 文案与所属分组；
 * - 定义 Markdown 模式下需要禁用的纯文本规则。
 */

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
  {
    key: "mdIndentParagraphs",
    label: "Markdown 段首缩进（跳过 H1-H6）",
    containerId: "other-settings",
    mdOnly: true,
  },
  {
    key: "mdStyleSpacing",
    label: "Markdown 样式两侧加空格（加粗/斜体/下划线）",
    containerId: "other-settings",
    mdOnly: true,
  },
  {
    key: "mdAutoBlankLines",
    label: "Markdown 段落自动空行",
    containerId: "other-settings",
    mdOnly: true,
  },
  {
    key: "mdTrimTrailingSpaces",
    label: "删除行尾空白",
    containerId: "other-settings",
    mdOnly: true,
  },
  {
    key: "mdHeadingSpaceAfterHash",
    label: "标题井号后补空格",
    containerId: "other-settings",
    mdOnly: true,
  },
  {
    key: "mdHeadingSingleSpaceAfterHash",
    label: "标题井号后空格归一化",
    containerId: "other-settings",
    mdOnly: true,
  },
  {
    key: "mdBlankLineAroundHeadings",
    label: "标题前后补空行",
    containerId: "other-settings",
    mdOnly: true,
  },
  {
    key: "mdListMarkerSpace",
    label: "列表标记后空格归一化",
    containerId: "other-settings",
    mdOnly: true,
  },
  {
    key: "mdBlankLineAroundFences",
    label: "围栏代码块前后补空行",
    containerId: "other-settings",
    mdOnly: true,
  },
  {
    key: "mdBlankLineAroundLists",
    label: "列表前后补空行",
    containerId: "other-settings",
    mdOnly: true,
  },
  {
    key: "mdEnsureSingleTrailingNewline",
    label: "文件末尾保证单个换行",
    containerId: "other-settings",
    mdOnly: true,
  },
];

const mdOffKeys: ReadonlyArray<BoolKey> = ["deleteBlankLines", "insertIndent"];

export { defs, mdOffKeys };
