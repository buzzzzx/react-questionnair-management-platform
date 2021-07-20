import React from "react";
import axios from "axios";
import Pie1 from "./radioPie";
import Bar1 from "./checkboxBar";
import Infolist from "./infolist";
import Textlist from "./textlist";
import "antd/dist/antd.css";
import "./index.css";
import { Layout, Menu, Breadcrumb, PageHeader, Spin } from "antd";
import { ContainerOutlined, TeamOutlined } from "@ant-design/icons";
import MenuItem from "antd/lib/menu/MenuItem";
import { useQuestionnaireId } from "../../utils/url";
import { useAnalysisQuestionnaire } from "../../utils/questionnaire";

const { SubMenu } = Menu;
const { Content, Sider } = Layout;

export const QuestionnaireAnalysis = () => {
  const id = useQuestionnaireId();
  const { data: questionnaire, isLoading } = useAnalysisQuestionnaire(id);

  console.log(isLoading, questionnaire);

  return isLoading ? <Spin size={"large"} /> : <></>;
};

export class QuestionnaireAnalysis1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      statistic: {},
      ifquestion: true,
    };
  }

  componentDidMount = () => {
    var auth = {
      username: "yl",
      password: "yl",
    };

    var api0 = "http://121.36.47.113:3000/login";
    axios.post(api0, auth).then((res) => {
      console.log("res=>", res);

      var api = "http://121.36.47.113:3000/questionnaires/14/analysis";
      axios
        .get(api, {
          headers: { Authorization: "Bearer " + res.data.user.token }, //设置header信息
        })
        .then((response) => {
          console.log("=====================");
          console.log(response.data);
          this.setState({
            questionList: response.data,
          });
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    });
  };

  renderQuestion = (question) => {
    return (
      <article>
        {question.type === 0 ? (
          <div>
            <Pie1 statistic={question} />
            <br />
          </div>
        ) : null}
        {question.type === 1 ? (
          <div>
            <Bar1 statistic={question} />
            <br />
          </div>
        ) : null}
        {question.type === 2 ? (
          <div>
            <Textlist statistic={question} />
            <br />
          </div>
        ) : null}
      </article>
    );
  };

  render() {
    let { questionList } = this.state;

    return (
      <Layout>
        <Layout>
          <Sider width={200} className="site-layout-background">
            <Menu
              mode="inline"
              defaultOpenKeys={["sub1"]}
              style={{ height: "100%", borderRight: 0 }}
            >
              <MenuItem
                icon={<TeamOutlined />}
                key={"问卷信息"}
                onClick={() => {
                  this.setState({
                    ifquestion: false,
                    statistic: {},
                  });
                }}
              >
                问卷信息
              </MenuItem>
              <SubMenu
                key="sub1"
                icon={<ContainerOutlined />}
                title="问卷统计分析"
              >
                {questionList?.questions?.map((question) => {
                  return (
                    <Menu.Item
                      key={question.no}
                      onClick={() => {
                        console.log("hhhhhhhhhhhh");
                        this.setState({
                          ifquestion: true,
                          statistic: question,
                        });
                      }}
                    >
                      题目{question.no}
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
              {this.state.ifquestion ? (
                <Breadcrumb.Item>
                  题目{this.state.statistic?.no}
                </Breadcrumb.Item>
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
                {this.state.ifquestion ? (
                  this.renderQuestion(this.state.statistic)
                ) : (
                  <Infolist questionlist={questionList} />
                )}
              </div>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}
