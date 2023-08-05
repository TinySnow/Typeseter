import React, { useState } from "react";
import type { RadioChangeEvent } from "antd";
import type { CheckboxValueType } from "antd/es/checkbox/Group";
import { Checkbox, Radio, Divider, Card } from "antd";
import { Option } from "@/models/option";
import { defaultPTS } from "@/models/default-pure-setting";
import {
  DELETE_BLANK_LINES,
  INSERT_INDENT,
  DELETE_SPACE_IN_CHINESE_CHARACTER,
  INSERT_SPACE_IN_CHINESE_AND_ENGLISH,
  FIX_COMMA,
  FIX_DOT,
  FIX_DOTS_TO_ELLIPSIS,
  FIX_COLON,
  FIX_QUESTION_MARK,
  FIX_SEMICOLON,
  FIX_CHINESE_COMMAS_FOLD,
  FIX_CHINESE_DOTS_FOLD,
  FIX_CHINESE_ELLIPSISES_FOLD,
  FIX_ENGLISH_BRACKETS_TO_CHINESE_BRACKETS,
  FIX_BANG,
  FIX_GUILLEMET,
  FIX_CHINESE_DASH,
  INSERT_SPACE_AFTER_PERCENT_SIGN,
} from "@/models/constants";

/**
 * 刷新本地存储纯文本配置项的函数。
 *
 * @param config 新纯文本配置项
 */
const refreshConfig = (config: Option) => {
  localStorage.setItem("pure-text-config", JSON.stringify(config));
};

/**
 * 写入默认纯文本配置项的函数。
 * 如果本地存储没有纯文本配置项（也即第一次进入网页），则返回默认配置的 string。
 * 返回 string 为了统一在获取 config 时 parse。
 *
 * @returns 默认纯文本配置
 */
const localStorageHasNoValue = (): string => {
  refreshConfig(defaultPTS);
  return JSON.stringify(defaultPTS);
};

/**
 * 纯文本配置项。
 * 如果本地有存储自定义纯文本配置项，则返回存储的配置项；
 * 如果没有，则返回默认纯文本配置项。
 */
let config: Option = JSON.parse(
  localStorage.getItem("pure-text-config") || localStorageHasNoValue()
);

/**
 * 常规修正配置，value 为 number 类型可以在 includes 时提高性能。
 */
const selections = [
  { label: "删除原始空行", value: DELETE_BLANK_LINES },
  { label: "插入段首缩进", value: INSERT_INDENT },
  { label: "删除汉字之间的空格", value: DELETE_SPACE_IN_CHINESE_CHARACTER },
  { label: "中英文之间插入空格", value: INSERT_SPACE_IN_CHINESE_AND_ENGLISH },
];

/**
 * 标点修正配置，value 为 number 类型可以在 includes 时提高性能。
 */
const punctuations = [
  { label: "逗号", value: FIX_COMMA },
  { label: "句点", value: FIX_DOT },
  { label: "冒号", value: FIX_COLON },
  { label: "叹号", value: FIX_BANG },
  { label: "问号", value: FIX_QUESTION_MARK },
  { label: "分号", value: FIX_SEMICOLON },
  { label: "括号", value: FIX_ENGLISH_BRACKETS_TO_CHINESE_BRACKETS },
  { label: "书名号", value: FIX_GUILLEMET },
  { label: "破折号", value: FIX_CHINESE_DASH },
  { label: "删除重复逗号", value: FIX_CHINESE_COMMAS_FOLD },
  { label: "删除重复句号", value: FIX_CHINESE_DOTS_FOLD },
  { label: "删除重复省略号", value: FIX_CHINESE_ELLIPSISES_FOLD },
  { label: "连续句点变为省略号", value: FIX_DOTS_TO_ELLIPSIS },
];

/**
 * 其他可选配置，value 为 number 类型可以在 includes 时提高性能。
 */
const others = [
  { label: "百分号后加空格", value: INSERT_SPACE_AFTER_PERCENT_SIGN },
];

/**
 * 计算多选框默认值的函数。
 * 从本地存储的 config 中校验每一项是否为 true，如真则推入数组进行勾选。
 *
 * @returns 多选框的默认值
 */
const defaultValue = (): CheckboxValueType[] => {
  const result = [];
  if (config.deleteBlankLines) result.push(DELETE_BLANK_LINES);
  if (config.insertIndent) result.push(INSERT_INDENT);
  if (config.deleteSpaceInChineseCharacter)
    result.push(DELETE_SPACE_IN_CHINESE_CHARACTER);
  if (config.insertSpaceInChineseAndEnglish)
    result.push(INSERT_SPACE_IN_CHINESE_AND_ENGLISH);

  if (config.comma) result.push(FIX_COMMA);
  if (config.dots2ellipsis) result.push(FIX_DOTS_TO_ELLIPSIS);
  if (config.dot) result.push(FIX_DOT);
  if (config.colon) result.push(FIX_COLON);
  if (config.bang) result.push(FIX_BANG);
  if (config.questionMark) result.push(FIX_QUESTION_MARK);
  if (config.semicolon) result.push(FIX_SEMICOLON);
  if (config.guillemet) result.push(FIX_GUILLEMET);
  if (config.chineseDash) result.push(FIX_CHINESE_DASH);
  if (config.chineseCommasFold) result.push(FIX_CHINESE_COMMAS_FOLD);
  if (config.chineseDotsFold) result.push(FIX_CHINESE_DOTS_FOLD);
  if (config.chineseEllipsisesFold) result.push(FIX_CHINESE_ELLIPSISES_FOLD);
  if (config.englishBrackets2ChineseBrackets)
    result.push(FIX_ENGLISH_BRACKETS_TO_CHINESE_BRACKETS);


  if (config.insertSpaceAfterPercentSign) result.push(INSERT_SPACE_AFTER_PERCENT_SIGN);
  return result;
};

const PureSetting: React.FC = () => {
  /**
   * 添加空行的数量
   */
  const [lineGapNumber, setLineGapNumber] = useState(config.lineGap);

  /**
   * 修改添加空行数量时触发的函数。
   * 修改后立即写入本地存储。
   *
   * @param e antd 的单选框事件
   */
  const changeLineNumber = (e: RadioChangeEvent) => {
    setLineGapNumber(e.target.value);
    config = {
      ...config,
      lineGap: e.target.value,
    };
    refreshConfig(config);
  };

  /**
   * 修改常规配置项的函数。
   * 修改后立即写入本地存储。
   *
   * @param checkedValues 多选框选中值的数组
   */
  const changeCommonSetting = (checkedValues: CheckboxValueType[]) => {
    config = {
      ...config,
      deleteBlankLines: checkedValues.includes(DELETE_BLANK_LINES),
      insertIndent: checkedValues.includes(INSERT_INDENT),
      deleteSpaceInChineseCharacter: checkedValues.includes(
        DELETE_SPACE_IN_CHINESE_CHARACTER
      ),
      insertSpaceInChineseAndEnglish: checkedValues.includes(
        INSERT_SPACE_IN_CHINESE_AND_ENGLISH
      ),
    };
    refreshConfig(config);
  };

  /**
   * 修改标点配置项的函数。
   * 修改后立即写入本地存储。
   *
   * @param checkedValues 多选框选中值的数组
   */
  const changePunctuationSetting = (checkedValues: CheckboxValueType[]) => {
    config = {
      ...config,
      comma: checkedValues.includes(FIX_COMMA),
      dots2ellipsis: checkedValues.includes(FIX_DOTS_TO_ELLIPSIS),
      dot: checkedValues.includes(FIX_DOT),
      colon: checkedValues.includes(FIX_COLON),
      bang: checkedValues.includes(FIX_BANG),
      questionMark: checkedValues.includes(FIX_QUESTION_MARK),
      semicolon: checkedValues.includes(FIX_SEMICOLON),
      guillemet: checkedValues.includes(FIX_GUILLEMET),
      chineseDash: checkedValues.includes(FIX_CHINESE_DASH),
      chineseCommasFold: checkedValues.includes(FIX_CHINESE_COMMAS_FOLD),
      chineseDotsFold: checkedValues.includes(FIX_CHINESE_DOTS_FOLD),
      chineseEllipsisesFold: checkedValues.includes(
        FIX_CHINESE_ELLIPSISES_FOLD
      ),
      englishBrackets2ChineseBrackets: checkedValues.includes(
        FIX_ENGLISH_BRACKETS_TO_CHINESE_BRACKETS
      ),
    };
    refreshConfig(config);
  };

  const changeOtherSetting = (checkedValue: CheckboxValueType[]) => {
    config = {
      ...config,
      insertSpaceAfterPercentSign: checkedValue.includes(
        INSERT_SPACE_AFTER_PERCENT_SIGN
      ),
    };
    refreshConfig(config);
  };

  return (
    <div>
      <Divider plain>常规修正</Divider>
      <div>
        <Checkbox.Group
          options={selections}
          defaultValue={defaultValue()}
          onChange={changeCommonSetting}
        />
      </div>
      <Divider plain>空行修正</Divider>
      <div>
        <Radio.Group onChange={changeLineNumber} value={lineGapNumber}>
          <Radio value={0}>段落间不空行</Radio>
          <Radio value={1}>段落间空一行</Radio>
          <Radio value={2}>段落间空两行</Radio>
        </Radio.Group>
      </div>
      <Divider plain>标点修正（英变中）</Divider>
      <div>
        <Checkbox.Group
          options={punctuations}
          defaultValue={defaultValue()}
          onChange={changePunctuationSetting}
        />
      </div>
      <Divider plain>其他可选修正</Divider>
      <Checkbox.Group
        options={others}
        defaultValue={defaultValue()}
        onChange={changeOtherSetting}
      />
    </div>
  );
};

export { PureSetting, config };
