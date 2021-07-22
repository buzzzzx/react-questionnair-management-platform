import React, { useState } from "react";
import Pie1 from "./radioPie";
import Bar1 from "./checkboxBar";
import Infolist from "./infolist";
import Textlist from "./textlist";
import "antd/dist/antd.css";
import "./index.css";
import { Layout, Menu, Breadcrumb, Spin } from "antd";
import { ContainerOutlined, TeamOutlined } from "@ant-design/icons";
import MenuItem from "antd/lib/menu/MenuItem";
import { useAnalysisQuestionnaire } from "../../utils/questionnaire";
import { useQuestionnaireId } from "../../utils/url";
import { Helmet } from "react-helmet";

const { SubMenu } = Menu;
const { Content, Sider } = Layout;

export const QuestionnaireAnalysis = () => {
  var [statistic, setStatistic] = useState();
  var [ifquestion, setIfquestion] = useState(false);
  var [No, setNo] = useState(1);
  const id = useQuestionnaireId();
  const { data: questionList, isLoading } = useAnalysisQuestionnaire(id);

  const renderQuestion = (question) => {
    return (
      <article>
        {question.type === 0 ? (
          <div>
            <Pie1 statistic={question} no={No} key={No} />
            <br />
          </div>
        ) : null}
        {question.type === 1 ? (
          <div>
            <Bar1 statistic={question} no={No} key={No} />
            <br />
          </div>
        ) : null}
        {question.type === 2 ? (
          <div>
            <Textlist statistic={question} no={No} key={No} />
            <br />
          </div>
        ) : null}
      </article>
    );
  };

  return isLoading ? (
    <Spin
      size={"large"}
      style={{
        margin: "10rem auto",
      }}
    />
  ) : (
    <Layout>
      <Helmet>
        <title>问卷分析</title>
      </Helmet>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultOpenKeys={["sub1"]}
            defaultSelectedKeys="问卷信息"
            style={{ height: "100%", borderRight: 0 }}
          >
            <MenuItem
              icon={<TeamOutlined />}
              key={"问卷信息"}
              onClick={() => {
                setIfquestion((ifquestion = false));
              }}
            >
              问卷信息
            </MenuItem>
            <SubMenu
              key="sub1"
              icon={<ContainerOutlined />}
              title="问卷统计分析"
            >
              {questionList?.questions?.map((question, index) => {
                return (
                  <Menu.Item
                    key={index}
                    onClick={() => {
                      setIfquestion((ifquestion = true));
                      setStatistic((statistic = question));
                      setNo((No = index + 1));
                    }}
                  >
                    题目{index + 1}
                  </Menu.Item>
                );
              })}
            </SubMenu>
          </Menu>
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Breadcrumb style={{ margin: "10px 0" }}>
            <Breadcrumb.Item>{questionList?.title}</Breadcrumb.Item>
            <Breadcrumb.Item>统计分析</Breadcrumb.Item>
            {ifquestion ? (
              <Breadcrumb.Item>题目{No}</Breadcrumb.Item>
            ) : (
              <Breadcrumb.Item>问卷信息</Breadcrumb.Item>
            )}
          </Breadcrumb>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <div
              type="flex"
              justify="center"
              align="middle"
              style={{ minHeight: "100vh" }}
            >
              <br />
              {ifquestion ? (
                renderQuestion(statistic)
              ) : (
                <Infolist questionlist={questionList} />
              )}
            </div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
