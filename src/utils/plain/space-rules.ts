import { mapP } from "./shared";
import { Rule } from "./types";
import { isAsciiWord, isCnPunc, isHan, isWs, nextNonWs } from "../chars";

/**
 * 纯文本空格类规则。
 * 设计目标：
 * 1) 去掉对 lookbehind / Unicode Script 正则的依赖；
 * 2) 用统一扫描器实现上下文判定，减少“高级正则 + fallback 正则”的双维护成本；
 * 3) 与原开关行为保持一致。
 */

/** 删除空白段（toParas 后空行会是 null）。 */
const rmBlankRule: Rule = {
  id: "deleteBlankLines",
  apply: (paras, opt) => {
    if (!opt.deleteBlankLines) {
      return paras;
    }
    return paras.filter((s) => s !== null);
  },
};

/**
 * 删除“汉字 <空白> 中文标点 / 中文标点 <空白> 汉字”之间的空白。
 * 例如：
 * - "中文 ，测试" -> "中文，测试"
 * - "中文， 测试" -> "中文，测试"
 */
const rmCnPuncSpRule: Rule = {
  id: "deleteSpaceBetweenChineseCharactersAndChinesePunctuations",
  apply: (paras, opt) => {
    if (!opt.deleteSpaceBetweenChineseCharactersAndChinesePunctuations) {
      return paras;
    }

    return mapP(paras, (s) =>
      stripWsByCtx(s, (prev, next) => {
        return (isHan(prev) && isCnPunc(next)) || (isCnPunc(prev) && isHan(next));
      })
    );
  },
};

/** 删除“汉字 <空白> 汉字”之间的空白。 */
const rmCnSpRule: Rule = {
  id: "deleteSpaceInChineseCharacter",
  apply: (paras, opt) => {
    if (!opt.deleteSpaceInChineseCharacter) {
      return paras;
    }

    return mapP(paras, (s) => stripWsByCtx(s, (prev, next) => isHan(prev) && isHan(next)));
  },
};

/** 段首插入两个全角空格。 */
const insIndentRule: Rule = {
  id: "insertIndent",
  apply: (paras, opt) => {
    if (!opt.insertIndent) {
      return paras;
    }
    return mapP(paras, (s) => `　　${s}`);
  },
};

/**
 * 在“汉字-ASCII词字符”边界插入半角空格。
 * 例如：
 * - 中文English -> 中文 English
 * - English中文 -> English 中文
 */
const insCnEnSpRule: Rule = {
  id: "insertSpaceInChineseAndEnglish",
  apply: (paras, opt) => {
    if (!opt.insertSpaceInChineseAndEnglish) {
      return paras;
    }

    return mapP(paras, insCnEnSp);
  },
};

/**
 * 上下文感知的空白折叠器。
 * 扫描到连续空白段时：
 * - 若 shouldDrop(prevNonWs, nextNonWs) 为 true，则整段空白删除；
 * - 否则保留原样（不改变空白内容和长度）。
 */
function stripWsByCtx(
  text: string,
  shouldDrop: (prevNonWs: string, nextNonWs: string) => boolean
): string {
  let out = "";
  let prevNonWs: string | null = null;

  for (let i = 0; i < text.length; i += 1) {
    const ch = text[i];

    if (!isWs(ch)) {
      out += ch;
      prevNonWs = ch;
      continue;
    }

    // 找到一整段连续空白 [i, j)
    let j = i;
    while (j < text.length && isWs(text[j])) {
      j += 1;
    }

    const next = nextNonWs(text, j);
    if (prevNonWs && next && shouldDrop(prevNonWs, next)) {
      // 删除这段空白
      i = j - 1;
      continue;
    }

    // 非目标上下文，原样保留
    out += text.slice(i, j);
    i = j - 1;
  }

  return out;
}

/**
 * 在中英文边界插空格。
 * 注意：这里只看相邻字符，不主动吞掉已有空白；
 * 因此该函数不会破坏用户原有的额外间距。
 */
function insCnEnSp(text: string): string {
  if (text.length < 2) {
    return text;
  }

  let out = "";
  for (let i = 0; i < text.length; i += 1) {
    const cur = text[i];
    const next = i + 1 < text.length ? text[i + 1] : null;
    out += cur;

    if (!next) {
      continue;
    }

    const needSp = (isHan(cur) && isAsciiWord(next)) || (isAsciiWord(cur) && isHan(next));

    if (needSp) {
      out += " ";
    }
  }

  return out;
}

export { rmBlankRule, rmCnPuncSpRule, rmCnSpRule, insIndentRule, insCnEnSpRule };
