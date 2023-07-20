import { Option } from "@/models/option";
import {
  chineseCommasFold,
  chineseDotsFold,
  chineseEllipsisesFold,
  colon,
  comma,
  dot,
  dots2ellipsis,
  englishBrackets2ChineseBrakets,
  questionMark,
  semicolon,
} from "@/utils/punctuation";

class Flow {
  /**
   * 段落数组
   * 采取数组形式便于对每段进行操作
   * 按文章操作逻辑复杂，不方便
   */
  private paragraphs: (string | null | undefined)[] = [];

  /**
   * 构造器，兼预处理。
   * 此函数（构造器）功能：
   * 1. 将文本以换行符为界分割成段落（paragraphs 数组）；
   * 2. 去除每段首尾的空白字符（半角空格、全角空格、制表符等）；
   *
   * @param text 传入的原始文本字符串
   */
  constructor(text: string) {
    this.paragraphs = text
      .split("\n")
      .map((paragraph) => paragraph.trim() || null);
  }
  /**
   * 删除空白行的函数。
   *
   * @param bool 是否删除空白行
   * @returns 如果不删除，直接返回
   */
  deleteBlankLines(bool: Boolean): Flow {
    if (bool) this.paragraphs = this.paragraphs.filter((str) => str !== null);
    return this;
  }

  /**
   * 添加缩进的函数。
   * 此函数目前只能添加两个全角空格缩进：“　　”
   *
   * @param bool 是否添加缩进
   * @returns 如果不添加缩进，直接返回
   */
  insertIndent(bool: Boolean): Flow {
    if (bool)
      this.paragraphs = this.paragraphs.map((s: string | null | undefined) =>
        s?.replace(/^/, "　　")
      );
    return this;
  }

  /**
   * 删除中文之间空白字符的函数。
   *
   * @param bool 是否删除中文之间的空白字符
   * @returns 如果不删除，直接返回
   */
  deleteSpaceInChineseCharacter(bool: Boolean): Flow {
    if (bool)
      this.paragraphs = this.paragraphs.map((s: string | null | undefined) =>
        // 注意：此处正则表达式使用了零宽断言，属于高级语法
        s?.replaceAll(/(?<=\p{Script=Han})\s+(?=\p{Script=Han})/gu, "")
      );
    return this;
  }

  /**
   * 在中英文之间插入半角空格的函数。
   *
   * @param bool 是否在中英文之间插入半角空格（ ）
   * @returns 如果不插入，直接返回
   */
  insertSpaceInChineseAndEnglish(bool: Boolean): Flow {
    if (bool)
      this.paragraphs = this.paragraphs.map((s: string | null | undefined) =>
        s?.replaceAll(
          // 注意：此处正则表达式使用了零宽断言，属于高级语法
          // 或符号（|）之前的部分，匹配前面中文后面英文的形式（中文English）
          // 或符号（|）之后的部分，匹配前面英文后面中文的形式（English中文）
          /(?<=\p{Script=Han})(?=[\w])|(?<=[\w])(?=\p{Script=Han})/gu,
          " "
        )
      );
    return this;
  }

  fixPunctuation(bool: Boolean): Flow {
    if (bool) {
      let p = this.paragraphs;
      p = comma(true, p);
      // 注意：多个句点变为省略号，和，句点修正，之间的顺序不能颠倒
      p = dots2ellipsis(true, p);
      p = dot(true, p);
      p = colon(true, p);
      p = questionMark(true, p);
      p = semicolon(true, p);
      p = chineseCommasFold(true, p);
      p = chineseDotsFold(true, p);
      p = chineseEllipsisesFold(true, p);
      p = englishBrackets2ChineseBrakets(true, p);
      this.paragraphs = p;
    }
    return this;
  }

  /**
   * 每段之间添加空行。
   * 负责：不添加空行、添加一个空行、添加两个空行，
   * 考虑后续更改为自定义空行数量。
   *
   * @param number 每段之间添加空行的数量，枚举类型
   */
  insertLineGap(number: number): Flow {
    if (number !== 0) {
      const p = this.paragraphs;
      this.paragraphs = p.flatMap((item, index) => {
        return index === p.length - 1
          ? item
          : [item, ...new Array(number === 1 ? 1 : 2).fill("")];
      });
    }
    return this;
  }

  /**
   * 处理完成的函数。
   * 此函数只能在处理流程的最后被调用。
   *
   * @returns 处理完成的文本内容
   */
  done() {
    return this.paragraphs.join("\n");
  }
}

export { Flow };
