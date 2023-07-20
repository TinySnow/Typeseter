import React, { useState } from "react";
import type { RadioChangeEvent } from "antd";
import type { CheckboxValueType } from "antd/es/checkbox/Group";
import { Checkbox, Radio } from "antd";
import { Option } from "@/models/option";
import { defaultPTS } from "@/models/default-pure-setting";

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
 * 多选框配置，value 为 number 类型可以在 includes 时提高性能。
 */
const selections = [
  { label: "删除原始空行", value: 1 },
  { label: "插入段首缩进", value: 2 },
  { label: "删除汉字之间的空格", value: 3 },
  { label: "中英文之间插入空格", value: 4 },
];

/**
 * 计算多选框默认值的函数。
 * 从本地存储的 config 中校验每一项是否为 true，如真则推入数组进行勾选。
 *
 * @returns 多选框的默认值
 */
const defaultValue = (): CheckboxValueType[] => {
  const result = [];
  if (config.deleteBlankLines) result.push(1);
  if (config.insertIndent) result.push(2);
  if (config.deleteSpaceInChineseCharacter) result.push(3);
  if (config.insertSpaceInChineseAndEnglish) result.push(4);
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
   * 修改其他配置项的函数。
   * 修改后立即写入本地存储。
   *
   * @param checkedValues 多选框选中值的数组
   */
  const changeCheckbox = (checkedValues: CheckboxValueType[]) => {
    config = {
      ...config,
      deleteBlankLines: checkedValues.includes(1),
      insertIndent: checkedValues.includes(2),
      deleteSpaceInChineseCharacter: checkedValues.includes(3),
      insertSpaceInChineseAndEnglish: checkedValues.includes(4),
    };
    refreshConfig(config);
  };

  return (
    <div>
      <div>
        <Checkbox.Group
          options={selections}
          defaultValue={defaultValue()}
          onChange={changeCheckbox}
        />
      </div>
      <div>
        <Radio.Group onChange={changeLineNumber} value={lineGapNumber}>
          <Radio value={0}>段落间不空行</Radio>
          <Radio value={1}>段落间空一行</Radio>
          <Radio value={2}>段落间空两行</Radio>
        </Radio.Group>
      </div>
    </div>
  );
};

export { PureSetting };
