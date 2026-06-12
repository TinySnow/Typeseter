/**
 * 默认配置：
 * - plain 与 markdown 默认项分别维护；
 * - defaultSettings 作为最终合并配置用于运行时初始化。
 */

import { Option } from "./option";

type MarkdownSettingKeys =
  | "mdIndentParagraphs"
  | "mdStyleSpacing"
  | "mdAutoBlankLines"
  | "mdTrimTrailingSpaces"
  | "mdHeadingSpaceAfterHash"
  | "mdHeadingSingleSpaceAfterHash"
  | "mdBlankLineAroundHeadings"
  | "mdListMarkerSpace"
  | "mdBlankLineAroundFences"
  | "mdBlankLineAroundLists"
  | "mdEnsureSingleTrailingNewline"
  | "mdCollapseBlankLines";

type PlainSettingKeys = Exclude<keyof Option, MarkdownSettingKeys>;

const defaultPlainSettings: Pick<Option, PlainSettingKeys> = {
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
  preserveBlankLines: false,
  noIndentFirstLine: false,
  insertBlankAfterTitle: false,
  insertBlankAfterAuthor: false,
};

const defaultMarkdownSettings: Pick<Option, MarkdownSettingKeys> = {
  mdIndentParagraphs: true,
  mdStyleSpacing: true,
  mdAutoBlankLines: true,
  mdTrimTrailingSpaces: true,
  mdHeadingSpaceAfterHash: true,
  mdHeadingSingleSpaceAfterHash: true,
  mdBlankLineAroundHeadings: true,
  mdListMarkerSpace: true,
  mdBlankLineAroundFences: true,
  mdBlankLineAroundLists: true,
  mdEnsureSingleTrailingNewline: true,
  mdCollapseBlankLines: false,
};

const defaultSettings: Option = {
  ...defaultPlainSettings,
  ...defaultMarkdownSettings,
};

export { defaultPlainSettings, defaultMarkdownSettings, defaultSettings };
