import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layout, Input, Button, Modal } from "antd";
import "antd/dist/antd.css";
import styled from "@emotion/styled";

import { Editor } from "./Editor";
import { LeftSide } from "./LeftSide";
import { SingleChoice } from "./SingleChoice/index";
import { MultipleChoice } from "./MultipleChoice/index";
import { SingleLineText } from "./SingleLineText";
import { QuestionList } from "./QuestionList";
import {
  useAddQuestionnaire,
  useEditQuestionnaire,
  useQuestionnaire,
} from "../../utils/questionnaire";
import { useQuestionnairesQueryKey } from "../questionnair-list/util";

const { Header, Content, Footer, Sider } = Layout;

export const Questionnaire = () => {
  const location = useLocation();
  const arr = location.pathname.split("/");
  const id =
    arr[arr.length - 2] === "questionnaires"
      ? false
      : Number(arr[arr.length - 2]);

  // useQuestionnaire
  const { data: editingQuestionnaire, isLoading } = useQuestionnaire(id);

  // 编辑 / 添加 hook
  const useMutateQuestionnaire = editingQuestionnaire
    ? useEditQuestionnaire
    : useAddQuestionnaire;

  const {
    mutateAsync,
    error,
    isLoading: mutateLoading,
  } = useMutateQuestionnaire(useQuestionnairesQueryKey());

  const navigate = useNavigate();

  const title = editingQuestionnaire ? "编辑问卷" : "新建问卷";

  // return (
  //     isLoading ? <div>isloading...</div> :
  //     <div>{title}</div>

  // )

  // form
  // title
  // TODO

  const [editorStatus, setEditorStatus] = useState("NotEdit");
  const [questionnaireTitle, setquestionnaireTitle] = useState("");
  const [questionList, setQuestionList] = useState([]);
  const [editorType, setEditorType] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);
  const [description, setDescription] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  console.log(questionList);

  useEffect(() => {
    if (!isLoading && editingQuestionnaire !== undefined) {
      setQuestionList(editingQuestionnaire.questions);
      setquestionnaireTitle(editingQuestionnaire.title);
      setDescription(editingQuestionnaire.description);
    }
  }, [isLoading, editingQuestionnaire]);

  const onFinish = () => {
    const questionnaire = {
      title: questionnaireTitle,
      description: description,
      questions: questionList,
      id: editingQuestionnaire ? id : null,
    };
    if (questionnaire.questions.length === 0 || questionnaire.title === "") {
      const errorContent =
        questionnaire.questions.length === 0
          ? "问卷还没有问题哦"
          : "问卷还没有标题哦";
      Modal.error({
        title: "当前问卷还未完成编辑哦",
        content: errorContent,
      });
    } else {
      console.log("最终提交的问卷", questionnaire);
      const response = mutateAsync(questionnaire);
      console.log("resoponse", response);
      response.then((result) => {
        const sucessContent = editingQuestionnaire
          ? "编辑问卷成功，请点击确定返回首页"
          : "新建问卷成功，请点击确定返回首页";
        const msg = result.msg;
        if (msg === "创建成功" || msg === "修改成功") {
          Modal.success({
            title: "编辑成功",
            content: <Button>{sucessContent}</Button>,
            okText: "确定",
            onOk() {
              navigate(`/`);
            },
          });
        }
      });
    }
  };

  function generated() {
    return Number(Math.random().toString().substr(3, 5) + Date.now()).toString(
      36
    );
  }

  var current_ques_no = 0;
  function ques_no() {
    return ++current_ques_no;
  }

  const currSingleChoiceQues = {
    no: ques_no(),
    title: "",
    type: 0,
    remarks: null,
    isNecessary: false,
    option: [
      { no: 1, text: "" },
      { no: 2, text: "" },
    ],
  };

  const currMultipleChoiceQues = {
    no: ques_no(),
    title: "",
    type: 1,
    remarks: null,
    isNecessary: false,
    option: [
      { no: 1, text: "" },
      { no: 2, text: "" },
    ],
  };

  const currSingleLineTextQues = {
    no: ques_no(),
    type: 2,
    title: null,
    isNecessary: false,
    remarks: null,
  };

  // 当问卷中还没有创建问卷时，且编辑状态为false时，显示初始界面
  if (isLoading) {
    console.log("Loading状态前的editorQuestionnaire", editingQuestionnaire);
    console.log("Loading状态");
    return <span>...isLoading</span>;
  } else {
    if (
      editorStatus === "NotEdit" &&
      editorType === null &&
      questionList.length === 0
    ) {
      return (
        <Layout>
          <Sider
            style={{
              overflow: "auto",
              height: "100vh",
              position: "fixed",
              left: 0,
            }}
          >
            <LeftSide
              editorStatus={editorStatus}
              setEditorStatus={setEditorStatus}
              editorType={editorType}
              setEditorType={setEditorType}
            ></LeftSide>
          </Sider>
          <Layout className="site-layout" style={{ marginLeft: 200 }}>
            <Header
              className="site-layout-background"
              style={{ padding: 0, textAlign: "right" }}
            >
              <Input
                type="button"
                value="完成编辑"
                style={{
                  marginRight: 64,
                  width: 100,
                  height: "100%",
                  background: "#0052cc",
                  fontSize: 20,
                  color: "white",
                  textAlign: "center",
                }}
                onClick={onFinish}
              ></Input>
            </Header>
            <Content
              style={{ margin: "24px 16px 0", overflow: "auto", height: "98%" }}
            >
              <div
                className="site-layout-background"
                style={{
                  padding: 24,
                  textAlign: "center",
                  overflow: "scroll",
                  height: "98%",
                }}
              >
                <QuestionnaireTitle>
                  <InputTitle
                    placeholder="问卷标题"
                    value={questionnaireTitle}
                    onChange={(event) => {
                      setquestionnaireTitle(event.target.value);
                    }}
                  />
                </QuestionnaireTitle>
                <InputDescription
                  placeholder="添加问卷说明"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                ></InputDescription>
                <Editor></Editor>
              </div>
            </Content>
            <Footer style={{ textAlign: "center", backgroundColor: "white" }}>
              问卷喵 提供技术支持
            </Footer>
          </Layout>
        </Layout>
      );
    } else if (editorStatus === "NotEdit" && questionList.length > 0) {
      console.log("上面展示问卷列表，下面展示问题创建");
      return (
        <Layout>
          <Sider
            style={{
              overflow: "auto",
              height: "100vh",
              position: "fixed",
              left: 0,
            }}
          >
            <LeftSide
              editorStatus={editorStatus}
              setEditorStatus={setEditorStatus}
              editorType={editorType}
              setEditorType={setEditorType}
            ></LeftSide>
          </Sider>
          <Layout className="site-layout" style={{ marginLeft: 200 }}>
            <Header
              className="site-layout-background"
              style={{ padding: 0, textAlign: "right" }}
            >
              <Input
                type="button"
                value="完成编辑"
                style={{
                  marginRight: 64,
                  width: 100,
                  height: "100%",
                  background: "#0052cc",
                  fontSize: 20,
                  color: "white",
                  textAlign: "center",
                  cursor: "pointer",
                }}
                onClick={onFinish}
              ></Input>
            </Header>
            <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
              <div
                className="site-layout-background"
                style={{
                  padding: 24,
                  textAlign: "center",
                  overflow: "scroll",
                  height: "98%",
                }}
              >
                <QuestionnaireTitle>
                  <InputTitle
                    placeholder="问卷标题"
                    value={questionnaireTitle}
                    onChange={(event) => {
                      setquestionnaireTitle(event.target.value);
                    }}
                  />
                </QuestionnaireTitle>
                <InputDescription
                  placeholder="添加问卷说明"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                ></InputDescription>
                <QuestionList
                  questionList={questionList}
                  setQuestionList={setQuestionList}
                  editorStatus={editorStatus}
                  setEditorStatus={setEditorStatus}
                  editorType={editorType}
                  setEditorType={setEditorType}
                  isUpdate={isUpdate}
                  setIsUpdate={setIsUpdate}
                ></QuestionList>
              </div>
            </Content>
            <Footer style={{ textAlign: "center", backgroundColor: "white" }}>
              问卷喵 提供技术支持
            </Footer>
          </Layout>
        </Layout>
      );
    } else {
      if (editorType === "SingleChoice") {
        return (
          <Layout>
            <Sider
              style={{
                overflow: "auto",
                height: "100vh",
                position: "fixed",
                left: 0,
              }}
            >
              <LeftSide
                editorStatus={editorStatus}
                setEditorStatus={setEditorStatus}
                editorType={editorType}
                setEditorType={setEditorType}
              ></LeftSide>
            </Sider>
            <Layout className="site-layout" style={{ marginLeft: 200 }}>
              <Header
                className="site-layout-background"
                style={{ padding: 0, textAlign: "right" }}
              >
                <Input
                  type="button"
                  value="完成编辑"
                  style={{
                    marginRight: 64,
                    width: 100,
                    height: "100%",
                    background: "#0052cc",
                    fontSize: 20,
                    color: "white",
                    textAlign: "center",
                    cursor: "pointer",
                  }}
                  onClick={onFinish}
                ></Input>
              </Header>

              <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
                <div
                  className="site-layout-background"
                  style={{
                    padding: 24,
                    textAlign: "center",
                    overflow: "scroll",
                    height: "98%",
                  }}
                >
                  <QuestionnaireTitle>
                    <InputTitle
                      placeholder="问卷标题"
                      value={questionnaireTitle}
                      onChange={(event) => {
                        setquestionnaireTitle(event.target.value);
                      }}
                    />
                  </QuestionnaireTitle>
                  <InputDescription
                    placeholder="添加问卷说明"
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                  ></InputDescription>
                  {questionList.length > 0 ? (
                    <QuestionList
                      questionList={questionList}
                      setQuestionList={setQuestionList}
                      editorStatus={editorStatus}
                      setEditorStatus={setEditorStatus}
                      editorType={editorType}
                      setEditorType={setEditorType}
                      isUpdate={isUpdate}
                      setIsUpdate={setIsUpdate}
                    ></QuestionList>
                  ) : (
                    <></>
                  )}
                  <SingleChoice
                    questionList={questionList}
                    setQuestionList={setQuestionList}
                    editorStatus={editorStatus}
                    setEditorStatus={setEditorStatus}
                    editorType={editorType}
                    setEditorType={setEditorType}
                    isUpdate={isUpdate}
                    currQues={currSingleChoiceQues}
                    setIsUpdate={setIsUpdate}
                  ></SingleChoice>
                </div>
              </Content>
              <Footer style={{ textAlign: "center", backgroundColor: "white" }}>
                问卷喵 提供技术支持
              </Footer>
            </Layout>
          </Layout>
        );
      } else if (editorType === "MultipleChoice") {
        return (
          <Layout>
            <Sider
              style={{
                overflow: "auto",
                height: "100vh",
                position: "fixed",
                left: 0,
              }}
            >
              <LeftSide
                editorStatus={editorStatus}
                setEditorStatus={setEditorStatus}
                editorType={editorType}
                setEditorType={setEditorType}
              ></LeftSide>
            </Sider>
            <Layout className="site-layout" style={{ marginLeft: 200 }}>
              <Header
                className="site-layout-background"
                style={{ padding: 0, textAlign: "right" }}
              >
                <Input
                  type="button"
                  value="完成编辑"
                  style={{
                    marginRight: 64,
                    width: 100,
                    height: "100%",
                    background: "#0052cc",
                    fontSize: 20,
                    color: "white",
                    textAlign: "center",
                    cursor: "pointer",
                  }}
                  onClick={onFinish}
                ></Input>
              </Header>
              <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
                <div
                  className="site-layout-background"
                  style={{
                    padding: 24,
                    textAlign: "center",
                    overflow: "scroll",
                    height: "98%",
                  }}
                >
                  <QuestionnaireTitle>
                    <InputTitle
                      placeholder="问卷标题"
                      value={questionnaireTitle}
                      onChange={(event) => {
                        setquestionnaireTitle(event.target.value);
                      }}
                    />
                  </QuestionnaireTitle>
                  <InputDescription
                    placeholder="添加问卷说明"
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                  ></InputDescription>
                  {questionList.length > 0 ? (
                    <QuestionList
                      questionList={questionList}
                      setQuestionList={setQuestionList}
                      editorStatus={editorStatus}
                      setEditorStatus={setEditorStatus}
                      editorType={editorType}
                      setEditorType={setEditorType}
                      isUpdate={isUpdate}
                      setIsUpdate={setIsUpdate}
                    ></QuestionList>
                  ) : (
                    <></>
                  )}
                  <MultipleChoice
                    questionList={questionList}
                    setQuestionList={setQuestionList}
                    editorStatus={editorStatus}
                    setEditorStatus={setEditorStatus}
                    editorType={editorType}
                    setEditorType={setEditorType}
                    isUpdate={isUpdate}
                    currQues={currMultipleChoiceQues}
                    setIsUpdate={setIsUpdate}
                  ></MultipleChoice>
                </div>
              </Content>
              <Footer style={{ textAlign: "center", backgroundColor: "white" }}>
                问卷喵 提供技术支持
              </Footer>
            </Layout>
          </Layout>
        );
      } else {
        console.log("当前编辑类型:SingleLineText");
        return (
          <Layout>
            <Sider
              style={{
                overflow: "auto",
                height: "100vh",
                position: "fixed",
                left: 0,
              }}
            >
              <LeftSide
                editorStatus={editorStatus}
                setEditorStatus={setEditorStatus}
                editorType={editorType}
                setEditorType={setEditorType}
              ></LeftSide>
            </Sider>
            <Layout className="site-layout" style={{ marginLeft: 200 }}>
              <Header
                className="site-layout-background"
                style={{ padding: 0, textAlign: "right" }}
              >
                <Input
                  type="button"
                  value="完成编辑"
                  style={{
                    marginRight: 64,
                    width: 100,
                    height: "100%",
                    background: "#0052cc",
                    fontSize: 20,
                    color: "white",
                    textAlign: "center",
                    cursor: "pointer",
                  }}
                  onClick={onFinish}
                ></Input>
              </Header>
              <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
                <div
                  className="site-layout-background"
                  style={{
                    padding: 24,
                    textAlign: "center",
                    overflow: "scroll",
                    height: "98%",
                  }}
                >
                  <QuestionnaireTitle>
                    <InputTitle
                      placeholder="问卷标题"
                      value={questionnaireTitle}
                      onChange={(event) => {
                        setquestionnaireTitle(event.target.value);
                      }}
                    />
                  </QuestionnaireTitle>
                  <InputDescription
                    placeholder="添加问卷说明"
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                  ></InputDescription>
                  {questionList.length > 0 ? (
                    <QuestionList
                      questionList={questionList}
                      setQuestionList={setQuestionList}
                      editorStatus={editorStatus}
                      setEditorStatus={setEditorStatus}
                      editorType={editorType}
                      setEditorType={setEditorType}
                      isUpdate={isUpdate}
                      setIsUpdate={setIsUpdate}
                    ></QuestionList>
                  ) : (
                    <></>
                  )}
                  <SingleLineText
                    questionList={questionList}
                    setQuestionList={setQuestionList}
                    editorStatus={editorStatus}
                    setEditorStatus={setEditorStatus}
                    editorType={editorType}
                    setEditorType={setEditorType}
                    isUpdate={isUpdate}
                    currQues={currSingleLineTextQues}
                    setIsUpdate={setIsUpdate}
                  ></SingleLineText>
                </div>
              </Content>
              <Footer style={{ textAlign: "center", backgroundColor: "white" }}>
                问卷喵 提供技术支持
              </Footer>
            </Layout>
          </Layout>
        );
      }
    }
  }
};

const QuestionnaireTitle = styled.div`
  margin: 5px 0;
  width: 100%;
  line-height: 64px;
  padding: 0 0;
  border-top: 1px solid transparent;
  border-bottom: 1px solid transparent;
`;

const InputTitle = styled(Input)`
  height: 45px;
  border-color: transparent;
  text-align: center;
  font-size: 25px;
  color: rgb(102, 102, 102);
  font-family: PingFangSC-Medium;
  width: 100%;
  border: 1px solid #ddd;
  outline: none;
  transition: all 0.3s;
  padding-left: 11px;
`;

const InputDescription = styled(Input)`
  font-size: 18px;
  margin-bottom: 64px;
`;
