import React from "react";
import { Input } from "antd";

const { TextArea } = Input;

type Props = {
  typesetted: string;
  isProcessed: boolean;
  onChange: (value: string) => void;
};

const In: React.FC<Props> = ({ typesetted, isProcessed, onChange }) => {
  /**
   * 展示在界面上的值
   */
  const [display, setDisplay] = React.useState(typesetted);

  /**
   * 每次用户输入，调用此函数。
   * 此函数功能：
   * 1. 设置显示在用户界面的值，保证 display 的值与用户输入的值实时同步；
   * 2. 回传给父组件，每次用户编辑时，都将 isProcessed 设置为 false，
   *    保证下次排版过的值传进来时，isProcessed 一定为 true
   *
   * @param e 挂载的 Element 节点
   */
  const handle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setDisplay(value);
    onChange(value);
  };

  return (
    <TextArea
      showCount
      value={isProcessed ? typesetted : display}
      rows={20}
      onChange={handle}
    />
  );
};

export { In };
