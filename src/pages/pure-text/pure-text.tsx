import React, { useState } from "react";
import { Layout, Col, Row, Button } from "antd";
import style from "./pure-text.less";
import { In } from "@/components/input";
import { Option } from "@/models/option";
import { typeset } from "@/utils/typeset";

const { Header, Footer, Content } = Layout;

const PureText = () => {
  /**
   * 待处理的文本（用户输入的文本）
   * 因为每次用户编辑，都会调用此组件的一个方法
   * 所以此变量实时更新
   */
  const [text, setText] = useState("");
  /**
   * 处理过的文本，默认为空
   */
  const [typesetted, setTypesetted] = useState("");
  /**
   * 是否显示设置项
   */
  const [isDisplay, setIsDisplay] = useState(false);
  /**
   * 是否处理过文本的 flag
   * 用于标记界面应该展示的文本：
   * 处理完成的文本，或者维持不变使用户继续编辑
   */
  const [isProcessed, setIsProcessed] = useState(false);

  const option: Option = {
    insertIndent: true,
    lineGap: "none",
    fixPunctuation: true,
    deleteBlankLines: true,
    deleteSpaceInChineseCharacter: true,
    insertSpaceInChineseAndEnglish: true,
  };

  /**
   * 每次用户输入，调用此函数。
   * 此函数功能：
   * 1. 设置待处理文本的值，保证 text 的值与用户输入的值实时同步；
   * 2. 每次用户编辑时，都将 isProcessed 设置为 false，
   *    保证下次排版过的值传进来时，isProcessed 一定为 true。
   *
   * @param value 子组件上传的输入框值
   */
  const handleTextChange = (value: string) => {
    setText(value);
    setIsProcessed(false);
  };

  /**
   * 用户点击开始排版时触发的函数。
   * 此函数功能：
   * 1. 排版待处理文本，并将处理后的文本通过 typesetted 传递给子组件；
   * 2. 设置 isProcessed 为 true，
   *    使得子组件的在下一次渲染输入框文本时，将其更改为处理后的文本。
   */
  const handleTypesetClick = () => {
    setTypesetted(typeset(text, option));
    setIsProcessed(true);
  };

  return (
    <Layout>
      <Header className={style.headerStyle}>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col span={6}>
            <Button
              type="primary"
              size="large"
              onClick={() => setIsDisplay(!isDisplay)}
            >
              {isDisplay ? "收起" : "显示"}设置
            </Button>
          </Col>
          <Col span={12} />
          <Col span={6} className={style.handleBotton}>
            <Button type="primary" size="large" onClick={handleTypesetClick}>
              立即排版
            </Button>
          </Col>
        </Row>
      </Header>
      <Content className={style.contentStyle}>
        <In
          typesetted={typesetted}
          isProcessed={isProcessed}
          onChange={handleTextChange}
        />
      </Content>
      <Footer className={style.footerStyle}>Footer</Footer>
    </Layout>
  );
};

export default PureText;
