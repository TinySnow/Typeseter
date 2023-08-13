import React, { useState } from "react";
import { Layout, Col, Row, Button, Collapse } from "antd";
import style from "./pure-text.less";
import { In } from "@/components/input";
import { PureSetting } from "@/components/pure-setting";
import { Option } from "@/models/option";
import { typeset } from "@/utils/typeset";
import Feeter from "@/components/footer";
import Link from "antd/es/typography/Link";

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
    const option: Option = JSON.parse(
      localStorage.getItem("pure-text-config") || ""
    );
    setTypesetted(typeset(text, option));
    setIsProcessed(true);
  };

  return (
    <Layout>
      <Header className={style.headerStyle}></Header>
      <Content className={style.contentStyle}>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col span={18}>
            <Collapse
              onChange={() => setIsDisplay(!isDisplay)}
              className={style.collapse}
              items={[
                {
                  key: "1",
                  label: (isDisplay ? "收起" : "显示") + "设置",
                  children: <PureSetting />,
                },
              ]}
            />
          </Col>
          <Col span={6} className={style.handleBotton}>
            <Button type="primary" size="large" onClick={handleTypesetClick}>
              立即排版
            </Button>
          </Col>
        </Row>
        <In
          typesetted={typesetted}
          isProcessed={isProcessed}
          onChange={handleTextChange}
        />
      </Content>
      <Footer className={style.footerStyle}>
        {/* <Feeter /> */}
        <Link href="https://github.com/TinySnow/Typeseter">Github</Link>
      </Footer>
    </Layout>
  );
};

export default PureText;
