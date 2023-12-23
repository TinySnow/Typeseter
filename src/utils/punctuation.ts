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
 * 注意，处理逻辑分为两步，详见注释。
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
    // 第一步
    // 此处将前面或后面汉字中夹杂的'.'改为'。'
    // 结果会造成例如序号后的句点也更改为句号，例如'1.'也更改为'1。'
    // 此处误修正将在第二步改回来
    let tmp = origin.map((s: string | null | undefined) =>
      // 注意：此处正则表达式使用了零宽断言，属于高级语法
      // 判断逻辑：只要前面或后面有汉字，则将中间的'.'改为'。'
      //          注意，有可能出现在行尾
      s?.replaceAll(
        /(?<=\p{Script=Han})\.\s*(?=[\s\S]*)|(?<=.)\.\s*(?=\p{Script=Han})/gu,
        "。"
      )
    );
    // 第二步
    // 将序号后的句号复原为句点
    // 注意，此处仅考虑一段文本的句首有序列表
    // 因为句中的有序列表句点需要 NLP，如“分为以下几个方面：1.第一方面；2.第二方面。”
    // 正则表达式处理不了语义分析这样庞大的工作量，所以此处置之不理
    // 所以此处判断逻辑是：
    // 以空白字符（0个或无数个）作为一段的开头，后面接（字母，数字，下划线和句点），再跟一个句点的文本
    // 前面保持不变，后面修正为一个句点加上一个半角空格
    // 第二个捕获组的相关考虑：
    // 1. 为什么是'[\w\.]*'，因为有可能存在形如多级序号（1.1.，1.2.1 等）的形式，其中数字和句点的字符不固定
    // 2. 为什么不是'[\d\.]*'这样直接跟数字和句点，因为有可能存在字母加数字（如常见的 Q1.，A1.，Example1. ）形成序号的形式
    // 此处逻辑有可能会出 BUG，暂时不考虑
    // TODO: 添加自定义段首缩进时，需要将第一个捕获组'(\s*)'更改为'([\s自定义缩进字符]*)'，需要额外传参数
    let result = tmp.map((s: string | null | undefined) =>
      s?.replaceAll(
        /^(\s*)([\w\.]*)。/gu,
        "$1$2\.\ "
      )
    );
    return result;
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
 * 修正英文感叹号的函数。
 *
 * @param bool 是否修正英文感叹号
 * @param origin 原始文本数组
 * @returns 修正英文感叹号后的文本数组
 */
function bang(
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
        /(?<=\p{Script=Han})!\s*(?=[\s\S]*)|(?<=.)!\s*(?=\p{Script=Han})/gu,
        "！"
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
 * 修正破折号的函数。
 * 匹配逻辑如下：
 * 1. 以 - 开头和结尾，中间可能有出现多余的空白字符和 - 的字符串
 * 2. 以 ~ 开头和结尾，中间可能有出现多余的空白字符和 ~ 的字符串
 * 3. 以 ～ 开头和结尾，中间可能有出现多余的空白字符和 ～ 的字符串
 * 4. 以 － 开头和结尾，中间可能有出现多余的空白字符和 － 的字符串
 *
 * @param bool 是否修正破折号
 * @param origin 原始文本数组
 * @returns 修正修正破折号后的文本数组
 */
function chineseDash(
  bool: Boolean,
  origin: (string | null | undefined)[]
): (string | null | undefined)[] {
  if (!bool) return origin;
  else {
    return origin.map((s: string | null | undefined) =>
      s?.replaceAll(
        /-(-*\s*)*-|~(~*\s*)*~|～(～*\s*)*～|－(－*\s*)*－|`{2,}/g,
        "——"
      )
    );
  }
}
/**
 * 折叠多个中文句号为一个省略号的函数。
 * 注意：两个中文句号“。。”即开始起算，条件严格。
 *
 * @param bool 是否折叠多个中文句号为一个省略号
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
 * 注意：三个中文省略号的一半“………”开始起算。
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
/**
 * 修正书名号的函数。
 * 注意：因为英文中本来没有书名号
 *      所以此处修正的书名号为西文双 Guillemet 书名号
 *      以及，中文网络文学里的仿书名号
 *
 * @param bool 是否修正书名号
 * @param origin 原始文本数组
 * @returns 修正书名号后的文本数组
 */
function guillemet(
  bool: Boolean,
  origin: (string | null | undefined)[]
): (string | null | undefined)[] {
  if (!bool) return origin;
  else {
    return origin.map((s: string | null | undefined) => {
      s = s?.replaceAll(/<<|«/gu, "《");
      return s?.replaceAll(/>>|»/g, "》");
    });
  }
}
/**
 * 修正英文括号为中文括号的函数。
 *
 * @param bool 是否将英文括号变为中文括号
 * @param origin 原始文本数组
 * @returns 修正英文括号为中文括号后的文本数组
 */
function englishBrackets2ChineseBrackets(
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
  bang,
  semicolon,
  guillemet,
  chineseDash,
  dots2ellipsis,
  chineseDotsFold,
  chineseCommasFold,
  chineseEllipsisesFold,
  englishBrackets2ChineseBrackets,
};
