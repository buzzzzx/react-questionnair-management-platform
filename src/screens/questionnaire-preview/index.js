import { useLocation, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import {
  Spin,
  Radio,
  Space,
  Checkbox,
  Input,
  Divider,
  Layout,
  Button,
  Modal,
  Anchor,
} from "antd";
import { useQuestionnaire } from "../../utils/questionnaire";

export const QuestionnairePreview = () => {
  const location = useLocation();
  const { Content, Footer } = Layout;
  const navigate = useNavigate();

  const arr = location.pathname.split("/");
  const id =
    arr[arr.length - 2] === "questionnaires"
      ? false
      : Number(arr[arr.length - 2]);

  const { data: questionnaire, isLoading } = useQuestionnaire(id);

  function generateKey() {
    return Number(Math.random().toString().substr(3, 5) + Date.now()).toString(
      36
    );
  }

  const onSubmit = () => {
    Modal.error({
      title: "这是问卷预览界面，不能提交哦",
      content: "问卷预览界面，只可预览问卷，不可提交",
      okText: "确定",
    });
  };

  const SingleChoiceDisplay = (props) => {
    const { question, index } = props;
    const quest_display_id = index + 1;
    return (
      <Question key={generateKey()}>
        <QuestionTitle>
          <span>{quest_display_id + ". "}</span>
          <span>{question.title}</span>
          {question.isNecessary ? <QuestionRequire>*</QuestionRequire> : <></>}
        </QuestionTitle>

        {question.remarks !== null ? <div>{question.remarks}</div> : <></>}

        <QuestionContent>
          <Radio.Group>
            <Space direction="vertical">
              {question.option.map((choice, index) => {
                return (
                  <Radio key={generateKey()} value={index + 1}>
                    {choice.text}
                  </Radio>
                );
              })}
            </Space>
          </Radio.Group>
        </QuestionContent>
        <Divider />
      </Question>
    );
  };

  // 多选题显示
  const MultipleChoiceDisplay = (props) => {
    const { question, index } = props;
    const quest_display_id = index + 1;
    return (
      <Question key={generateKey()}>
        <QuestionTitle>
          <span>{quest_display_id + ". "}</span>
          <span>{question.title}</span>
          {question.isNecessary ? <QuestionRequire>*</QuestionRequire> : <></>}
        </QuestionTitle>
        {question.remarks !== null ? <div>{question.remarks}</div> : <></>}
        <QuestionContent>
          <Checkbox.Group>
            <Space direction="vertical">
              {question.option.map((choice, index) => {
                return (
                  <Checkbox key={generateKey()} value={index + 1}>
                    {choice.text}
                  </Checkbox>
                );
              })}
            </Space>
          </Checkbox.Group>
        </QuestionContent>
        <Divider />
      </Question>
    );
  };

  // 单行文本题显示
  const SingleLineTextDisplay = (props) => {
    const { question, index } = props;
    const quest_display_id = index + 1;
    return (
      <Question key={generateKey()}>
        <QuestionTitle>
          <span>{quest_display_id + ". "}</span>
          <span>{question.title}</span>
          {question.isNecessary ? <QuestionRequire>*</QuestionRequire> : <></>}
        </QuestionTitle>

        {question.remarks !== null ? <div>{question.remarks}</div> : <></>}
        <QuestionContent>
          <Input></Input>
        </QuestionContent>
        <Divider />
      </Question>
    );
  };

  return isLoading ? (
    <Spin size={"large"} />
  ) : (
    <Layout
      className="layout"
      style={{
        display: "flex",
        textAlign: "center",
        alignItems: "center",
        backgroundImage: "none",
      }}
    >
      <Content
        style={{
          padding: "10 50px",
          background: "white",
          height: "98%",
          overflow: "auto",
          width: "60%",
        }}
      >
        <Title>{questionnaire.title}</Title>
        {questionnaire.description === null ? (
          <></>
        ) : (
          <InputDescription>{questionnaire.description}</InputDescription>
        )}
        <Divider />
        <div
          style={{
            height: "95%",
            marginBottom: "20",
          }}
        >
          {questionnaire.questions.map((question, index) => {
            if (question.type === 0) {
              return (
                <SingleChoiceDisplay
                  id="question.no"
                  key={generateKey()}
                  question={question}
                  index={index}
                ></SingleChoiceDisplay>
              );
            } else if (question.type === 1) {
              return (
                <MultipleChoiceDisplay
                  id="question.no"
                  key={generateKey()}
                  question={question}
                  index={index}
                ></MultipleChoiceDisplay>
              );
            } else {
              return (
                <SingleLineTextDisplay
                  id="question.no"
                  key={generateKey()}
                  question={question}
                  index={index}
                ></SingleLineTextDisplay>
              );
            }
          })}
          <div style={{ paddingBottom: "20px" }}>
            <ButtonInner type="primary" size="large" onClick={onSubmit}>
              提交问卷
            </ButtonInner>
            <ButtonInner
              size="large"
              onClick={() => {
                navigate("/");
              }}
            >
              返回首页
            </ButtonInner>
          </div>
        </div>
      </Content>

      <Footer>问卷喵 提供技术支持</Footer>
    </Layout>
  );
};

// const Questions = styled.div`
//   width: 100%;
//   text-align: center;
//   align-items: center;
//   justify-content: center;
//   height: 95%;
//   overflow: visible;
// `;

const Title = styled.div`
  font-size: 35px;
  margin-bottom: 20px;
  margin-top: 18px;
`;

const Question = styled.div`
  position: relative;
  padding: 5px;
  padding-left: 80px;
  width: 800px;
  height: auto;
  text-align: left;
`;

const QuestionTitle = styled.div`
  font-size: 20px;
  color: #444444;
  font-weight: bold;
  height: 99%;
  line-height: 20px;
  position: relative;
  margin-bottom: 15px;
`;

const QuestionContent = styled.div`
  clear: both;
  padding-top: 5px;
  font-size: 25px;
  color: #333333;
`;

const QuestionRequire = styled.span`
  color: red;
  vertical-align: middle;
  margin-left: 5px;
`;

const InputDescription = styled.div`
  font-size: 18px;
  margin-bottom: 40px;
  margin-top: 18px;
`;

const ButtonInner = styled(Button)`
  padding: 6px 20px;
  margin: 0 10px;
  outline: none;
  cursor: pointer;
  font-size: 18px;
`;
