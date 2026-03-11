/**
 * 正则能力探测：
 * - 仅用于 UI 层提示“高级正则不支持”场景；
 * - 结果做一次缓存，避免重复创建 RegExp。
 */
let advancedRegexSupported: boolean | null = null;

function supportsAdvancedRegex(): boolean {
  if (advancedRegexSupported !== null) {
    return advancedRegexSupported;
  }

  try {
    // 代表性检测：lookbehind + Unicode Script。
    new RegExp("(?<=\\p{Script=Han})\\s+(?=\\p{Script=Han})", "gu");
    advancedRegexSupported = true;
  } catch {
    advancedRegexSupported = false;
  }

  return advancedRegexSupported;
}

export { supportsAdvancedRegex };
