/**
 * 百分号后添加空格的函数。
 * 注意：此函数仅为了美观。
 *      因为 % 是一个全角字符，可以不用其后添加空格。
 *      但此种形式不太美观：上涨了 5%的利润
 *      所以改为下面的形式：上涨了 5% 的利润
 * @param bool 是否在百分号后添加空格
 * @param origin 原始文本数组
 * @returns 在百分号后添加空格后的文本数组
 */
function insertSpaceAfterPercentSign(
  bool: Boolean,
  origin: (string | null | undefined)[]
): (string | null | undefined)[] {
  if (!bool) return origin;
  else {
    return origin.map((s: string | null | undefined) =>
      s?.replaceAll(/(?<=%)(?=\p{Script=Han})/gu, " ")
    );
  }
}

export { insertSpaceAfterPercentSign };
