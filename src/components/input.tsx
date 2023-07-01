import React from "react";
import { Input } from "antd";

const { TextArea } = Input;

const In: React.FC = () => (
  <>
    <TextArea rows={20} showCount />
  </>
);

export { In };
