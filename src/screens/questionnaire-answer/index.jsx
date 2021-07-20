import { useLocation } from "react-router";
import { Helmet } from "react-helmet";
import styled from "@emotion/styled";
import { useAnswer } from "../../utils/answer";
import { useQuestionnaire } from "../../utils/questionnaire";
import { Radio, Checkbox, Input, Space, Divider, Layout, Spin } from "antd";
import { useState, useEffect } from "react";

export const QuestionnaireAnswer = () => {
  // http://localhost:3000/answers/164
  const location = useLocation();
  const arr = location.pathname.split("/");
  const quest_id = arr[2];
  const answer_id = arr[4];
  // GET 答卷内容
  const { data: answers, isLoading } = useAnswer(answer_id);

  // GET 问卷内容
  const { data: questionnaire, isLoading2 } = useQuestionnaire(quest_id);

  function generateKey() {
    return Number(Math.random().toString().substr(3, 5) + Date.now()).toString(
      36
    );
  }

  const { Content, Footer } = Layout;

  const [answer, setAnswer] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [isView, setIsView] = useState(false);

  useEffect(() => {
    if (questionnaire !== undefined && answers !== undefined) {
      const currentAnswer = answers.answer.map((item) => item.answer);
      setAnswer(currentAnswer);
      const currentQuestions = questionnaire.questions;
      setQuestions(currentQuestions);
      setDescription(questionnaire.description);
      setTitle(questionnaire.title);
      setIsView(true);
    }
  }, [isLoading, isLoading2]);

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
          <Radio.Group disabled={true} defaultValue={answer[index]}>
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
          <Checkbox.Group disabled={true} defaultValue={answer[index]}>
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
          <InputArea defaultValue={answer[index]} disabled={true}></InputArea>
        </QuestionContent>
        <Divider />
      </Question>
    );
  };

  return isView === false ? (
    <Spin
      size={"large"}
      style={{
        margin: "10rem auto",
      }}
    />
  ) : (
    <Layout
      className="layout"
      style={{
        display: "flex",
        textAlign: "center",
        alignItems: "center",
      }}
    >
      <Helmet>
        <title>答卷显示</title>
      </Helmet>
      <Content
        style={{
          padding: "10 50px",
          background: "white",
          height: "98%",
          overflow: "auto",
          width: "60%",
        }}
      >
        <Title>{title}</Title>
        {description === null ? (
          <></>
        ) : (
          <InputDescription>{description}</InputDescription>
        )}
        <Divider />
        <div
          style={{
            height: "95%",
            marginBottom: "20",
          }}
        >
          {questions.map((question, index) => {
            if (question.type === 0) {
              return (
                <SingleChoiceDisplay
                  key={generateKey()}
                  question={question}
                  index={index}
                ></SingleChoiceDisplay>
              );
            } else if (question.type === 1) {
              return (
                <MultipleChoiceDisplay
                  key={generateKey()}
                  question={question}
                  index={index}
                ></MultipleChoiceDisplay>
              );
            } else {
              return (
                <SingleLineTextDisplay
                  key={generateKey()}
                  question={question}
                  index={index}
                ></SingleLineTextDisplay>
              );
            }
          })}
        </div>
      </Content>
      <Footer>问卷喵 提供技术支持</Footer>
    </Layout>
  );
};

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
  height: auto;
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
  margin-bottom: 20px;
  text-align: center;
`;

const InputArea = styled(Input)``;
