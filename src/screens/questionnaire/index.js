import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layout, Input, Modal } from "antd";
import "antd/dist/antd.css";
import styled from "@emotion/styled";
import { Helmet } from "react-helmet";
import Tour from "reactour";

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
  const [isTourOpen, setIsTourOpen] = useState(true);

  useEffect(() => {
    if (!isLoading && editingQuestionnaire !== undefined) {
      setQuestionList(editingQuestionnaire.questions);
      setquestionnaireTitle(editingQuestionnaire.title);
      setDescription(editingQuestionnaire.description);
    }
  }, [isLoading, editingQuestionnaire]);

  // 用户引导
  const steps = [
    {
      selector: ".questionnaire_title",
      content: "在这里输入问卷标题",
      position: "bottom",
    },
    {
      selector: ".questionnaire_description",
      content: "在这里输入问卷描述信息（可选）",
    },
    {
      selector: ".questionnaire_items",
      content: "在这里选择问题控件，创建对应类型的问题",
    },
    {
      selector: ".questionnaire_questions",
      content:
        "创建好的问题会显示在这里，你可以在这个区域对创建好的问题进行编辑、删除操作，还可以通过拖拽改变问题的顺序",
    },
    {
      selector: ".questionnaire_finish",
      content: "问卷创建好后，点击完成编辑按钮，提交问卷",
    },
  ];

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
      const response = mutateAsync(questionnaire);
      response.then((result) => {
        const sucessContent = editingQuestionnaire
          ? "编辑问卷成功，请点击确定返回首页"
          : "新建问卷成功，请点击确定返回首页";
        const msg = result.msg;
        if (msg === "创建成功" || msg === "修改成功") {
          Modal.success({
            title: "编辑成功",
            content: <>{sucessContent}</>,
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
    return <span>...isLoading</span>;
  } else {
    if (
      editorStatus === "NotEdit" &&
      editorType === null &&
      questionList.length === 0
    ) {
      return (
        <Layout>
          <Helmet>
            <title>设计问卷</title>
          </Helmet>
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
                className="questionnaire_finish"
                type="button"
                value="完成编辑"
                placeholder="Borderless"
                bordered={false}
                onMouseOver={(e) => {
                  e.target.bordered = true;
                }}
                onMouseLeave={(e) => {
                  e.target.bordered = false;
                }}
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
            <Content
              style={{ margin: "24px 16px 0", overflow: "auto", height: "98%" }}
            >
              <div
                className="site-layout-background"
                style={{
                  padding: 24,
                  textAlign: "center",
                  overflow: "auto",
                  height: "98%",
                }}
              >
                <QuestionnaireTitle>
                  <InputTitle
                    className="questionnaire_title"
                    placeholder="问卷标题"
                    value={questionnaireTitle}
                    onChange={(event) => {
                      setquestionnaireTitle(event.target.value);
                    }}
                  />
                </QuestionnaireTitle>
                <InputDescription
                  className="questionnaire_description"
                  placeholder="添加问卷说明"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                ></InputDescription>
                <Editor className="questionnaire_questions"></Editor>
              </div>
            </Content>
            <Footer style={{ textAlign: "center", backgroundColor: "white" }}>
              问卷喵 提供技术支持
            </Footer>
          </Layout>
          <Tour
            steps={steps}
            isOpen={isTourOpen}
            onRequestClose={() => {
              setIsTourOpen(false);
            }}
          />
        </Layout>
      );
    } else if (editorStatus === "NotEdit" && questionList.length > 0) {
      return (
        <Layout>
          <Helmet>
            <title>设计问卷</title>
          </Helmet>
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
                placeholder="Borderless"
                bordered={false}
                autoFocus={true}
                onMouseOver={(e) => {
                  e.target.bordered = true;
                }}
                onMouseLeave={(e) => {
                  e.target.bordered = false;
                }}
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
                  border: "1px, solid, white",
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
                  overflow: "auto",
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
            <Helmet>
              <title>设计问卷</title>
            </Helmet>
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
                  placeholder="Borderless"
                  bordered={false}
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

              <Content style={{ margin: "24px 16px 0", overflow: "auto" }}>
                <div
                  className="site-layout-background"
                  style={{
                    padding: 24,
                    textAlign: "center",
                    overflow: "auto",
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
            <Helmet>
              <title>设计问卷</title>
            </Helmet>
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
                  placeholder="Borderless"
                  bordered={false}
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
                    overflow: "auto",
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
        return (
          <Layout>
            <Helmet>
              <title>设计问卷</title>
            </Helmet>
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
                  placeholder="Borderless"
                  bordered={false}
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
                    overflow: "auto",
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
