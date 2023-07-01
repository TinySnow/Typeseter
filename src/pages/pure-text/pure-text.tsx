import React, { useState } from "react";
import { Layout, Col, Row, Button } from "antd";

import style from "./pure-text.less";
import { In } from "@/components/input";

const { Header, Footer, Content } = Layout;

const PureText = () => {
  const [isDisplay, setIsDisplay] = useState(false);

  const display = () => {
    setIsDisplay(!isDisplay);
  };

  return (
    <Layout>
      <Header className={style.headerStyle}>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col span={6}>
            <Button type="primary" size="large" onClick={display}>
              {isDisplay ? "收起" : "显示"}设置
            </Button>
          </Col>
          <Col span={12} />
          <Col span={6} className={style.handleBotton}>
            <Button type="primary" size="large">
              立即排版
            </Button>
          </Col>
        </Row>
      </Header>
      <Content className={style.contentStyle}>
        <In />
      </Content>
      <Footer className={style.footerStyle}>Footer</Footer>
    </Layout>
  );
};

export default PureText;
