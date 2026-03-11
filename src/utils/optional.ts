import { supportsAdvancedRegex, HAN_CLASS } from "./regex-support";

const useAdvancedRegex = supportsAdvancedRegex();
const RE_SPACE_AFTER_PERCENT_ADV = useAdvancedRegex
  ? new RegExp("(?<=%)(?=\\p{Script=Han})", "gu")
  : null;
const RE_SPACE_AFTER_PERCENT_FB = new RegExp(`%(${HAN_CLASS})`, "g");

function insertSpaceAfterPercentSign(
  enabled: boolean,
  origin: (string | null | undefined)[]
): (string | null | undefined)[] {
  if (!enabled) {
    return origin;
  }

  for (let i = 0; i < origin.length; i += 1) {
    const s = origin[i];
    if (s != null) {
      origin[i] = RE_SPACE_AFTER_PERCENT_ADV
        ? s.replaceAll(RE_SPACE_AFTER_PERCENT_ADV, " ")
        : s.replace(RE_SPACE_AFTER_PERCENT_FB, "% $1");
    }
  }

  return origin;
}

export { insertSpaceAfterPercentSign };
