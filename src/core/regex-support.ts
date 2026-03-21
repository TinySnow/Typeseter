/**
 * 正则能力探测：
 * - 仅用于 UI 层提示“高级正则不支持”场景；
 * - 结果做一次缓存，避免重复创建 RegExp。
 */
let advancedRegexSupported: boolean | null = null;

/**
 * 检测当前环境是否支持高级正则表达式特性
 * @returns 如果支持高级正则表达式特性（如 lookbehind 断言和 Unicode Script），返回 true；否则返回 false
 * @description 实现原理：
 * 1. 首先检查缓存的检测结果，如果已存在则直接返回
 * 2. 尝试创建一个包含 lookbehind 断言和 Unicode Script 特性的正则表达式
 * 3. 如果创建成功，说明支持高级正则表达式特性，将结果缓存为 true
 * 4. 如果创建失败，说明不支持高级正则表达式特性，将结果缓存为 false
 * 5. 返回检测结果
 * @note 结果会被缓存，避免重复检测，提高性能
 */
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