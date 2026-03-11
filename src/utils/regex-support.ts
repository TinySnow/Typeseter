let advancedRegexSupported: boolean | null = null;

// Basic Han ranges used by fallback regex when Unicode Script escapes are unavailable.
const HAN_CLASS = "[\\u3400-\\u4DBF\\u4E00-\\u9FFF\\uF900-\\uFAFF]";
const ASCII_WORD_CLASS = "[A-Za-z0-9_]";
const CHINESE_PUNCTUATION_CLASS = "[，。；‘’【】（）￥《》：“”…！？、~～·]";

function supportsAdvancedRegex(): boolean {
  if (advancedRegexSupported !== null) {
    return advancedRegexSupported;
  }

  try {
    new RegExp("(?<=\\p{Script=Han})\\s+(?=\\p{Script=Han})", "gu");
    advancedRegexSupported = true;
  } catch {
    advancedRegexSupported = false;
  }

  return advancedRegexSupported;
}

export {
  supportsAdvancedRegex,
  HAN_CLASS,
  ASCII_WORD_CLASS,
  CHINESE_PUNCTUATION_CLASS,
};
