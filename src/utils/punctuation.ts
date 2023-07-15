/**
 * 修正英文逗号的函数。
 *
 * @param bool 是否修正英文逗号
 * @param origin 原始文本数组
 * @returns 修正英文逗号后的文本数组
 */
function comma(
  bool: Boolean,
  origin: (string | null | undefined)[]
): (string | null | undefined)[] {
  if (!bool) return origin;
  else {
    return origin.map((s: string | null | undefined) =>
      // 注意：此处正则表达式使用了零宽断言，属于高级语法
      // 判断逻辑：只要前后有汉字，则将中间的','改为'，'
      //          注意，有可能出现在行尾
      s?.replaceAll(
        /(?<=\p{Script=Han}),\s*(?=[\s\S]*)|(?<=.),\s*(?=\p{Script=Han})/gu,
        "，"
      )
    );
  }
}

/**
 * 修正英文句点的函数。
 *
 * @param bool 是否修正英文句点
 * @param origin 原始文本数组
 * @returns 修正英文句点后的文本数组
 */
function dot(
  bool: Boolean,
  origin: (string | null | undefined)[]
): (string | null | undefined)[] {
  if (!bool) return origin;
  else {
    return origin.map((s: string | null | undefined) =>
      // 注意：此处正则表达式使用了零宽断言，属于高级语法
      // 判断逻辑：只要前后有汉字，则将中间的'.'改为'。'
      //          注意，有可能出现在行尾
      s?.replaceAll(
        /(?<=\p{Script=Han})\.\s*(?=[\s\S]*)|(?<=.)\.\s*(?=\p{Script=Han})/gu,
        "。"
      )
    );
  }
}

/**
 * 修正英文冒号的函数。
 *
 * @param bool 是否修正英文冒号
 * @param origin 原始文本数组
 * @returns 修正英文冒号后的文本数组
 */
function colon(
  bool: Boolean,
  origin: (string | null | undefined)[]
): (string | null | undefined)[] {
  if (!bool) return origin;
  else {
    return origin.map((s: string | null | undefined) =>
      // 注意：此处正则表达式使用了零宽断言，属于高级语法
      // 判断逻辑：只要前后有汉字，则将中间的':'改为'：'
      //          注意，有可能出现在行尾
      s?.replaceAll(
        /(?<=\p{Script=Han}):\s*(?=[\s\S]*)|(?<=.):\s*(?=\p{Script=Han})/gu,
        "："
      )
    );
  }
}

/**
 * 修正英文问号的函数。
 *
 * @param bool 是否修正英文问号
 * @param origin 原始文本数组
 * @returns 修正英文问号后的文本数组
 */
function questionMark(
  bool: Boolean,
  origin: (string | null | undefined)[]
): (string | null | undefined)[] {
  if (!bool) return origin;
  else {
    return origin.map((s: string | null | undefined) =>
      // 注意：此处正则表达式使用了零宽断言，属于高级语法
      // 判断逻辑：只要前后有汉字，则将中间的'?'改为'？'
      //          注意，有可能出现在行尾
      s?.replaceAll(
        /(?<=\p{Script=Han})\?\s*(?=[\s\S]*)|(?<=.)\?\s*(?=\p{Script=Han})/gu,
        "？"
      )
    );
  }
}

/**
 * 修正英文分号的函数。
 *
 * @param bool 是否修正英文分号
 * @param origin 原始文本数组
 * @returns 修正英文分号后的文本数组
 */
function semicolon(
  bool: Boolean,
  origin: (string | null | undefined)[]
): (string | null | undefined)[] {
  if (!bool) return origin;
  else {
    return origin.map((s: string | null | undefined) =>
      // 注意：此处正则表达式使用了零宽断言，属于高级语法
      // 判断逻辑：只要前后有汉字，则将中间的';'改为'；'
      //          注意，有可能出现在行尾
      s?.replaceAll(
        /(?<=\p{Script=Han});\s*(?=[\s\S]*)|(?<=.);\s*(?=\p{Script=Han})/gu,
        "；"
      )
    );
  }
}

/**
 * 折叠多个英文句点为一个中文省略号的函数。
 * 注意：三个英文句点“...”开始起算。
 *
 * @param bool 是否折叠多个英文句点为一个中文省略号
 * @param origin 原始文本数组
 * @returns 修正多个英文句点后的文本数组
 */
function dots2ellipsis(
  bool: Boolean,
  origin: (string | null | undefined)[]
): (string | null | undefined)[] {
  if (!bool) return origin;
  else {
    return origin.map((s: string | null | undefined) =>
      s?.replaceAll(/\.{3,}/g, "……")
    );
  }
}

/**
 * 折叠多个中文句号为一个句号的函数。
 * 注意：两个中文句号“。。”即开始起算，条件严格。
 *
 * @param bool 是否折叠多个中文句号为一个句号
 * @param origin 原始文本数组
 * @returns 修正多个中文句号后的文本数组
 */
function chineseDotsFold(
  bool: Boolean,
  origin: (string | null | undefined)[]
): (string | null | undefined)[] {
  if (!bool) return origin;
  else {
    return origin.map((s: string | null | undefined) =>
      s?.replaceAll(/。{2,}/g, "……")
    );
  }
}

/**
 * 折叠多个中文逗号为一个逗号的函数。
 * 注意：两个中文逗号“，，”即开始起算，条件严格。
 *
 * @param bool 是否折叠多个中文逗号为一个逗号
 * @param origin 原始文本数组
 * @returns 修正多个中文逗号后的文本数组
 */
function chineseCommasFold(
  bool: Boolean,
  origin: (string | null | undefined)[]
): (string | null | undefined)[] {
  if (!bool) return origin;
  else {
    return origin.map((s: string | null | undefined) =>
      s?.replaceAll(/，{2,}/g, "，")
    );
  }
}

/**
 * 折叠多个中文省略号为一个省略号的函数。
 * 注意：两个中文省略号的一半“………”开始起算。
 *      以半个中文省略号为单位判断。
 *
 * @param bool 是否折叠多个中文省略号为一个省略号
 * @param origin 原始文本数组
 * @returns 修正多个中文省略号后的文本数组
 */
function chineseEllipsisesFold(
  bool: Boolean,
  origin: (string | null | undefined)[]
): (string | null | undefined)[] {
  if (!bool) return origin;
  else {
    return origin.map((s: string | null | undefined) =>
      s?.replaceAll(/…{3,}/g, "……")
    );
  }
}

function englishBrackets2ChineseBrakets(
  bool: Boolean,
  origin: (string | null | undefined)[]
): (string | null | undefined)[] {
  if (!bool) return origin;
  else {
    return origin.map((s: string | null | undefined) =>
      s?.replaceAll(/\(([^()]*\p{Script=Han}+[^()]*)\)/gu, "（$1）")
    );
  }
}

export {
  comma,
  dot,
  colon,
  questionMark,
  semicolon,
  dots2ellipsis,
  chineseDotsFold,
  chineseCommasFold,
  chineseEllipsisesFold,
  englishBrackets2ChineseBrakets,
};
