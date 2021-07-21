import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDeepCompareEffect } from "react-use";
import { Helmet } from "react-helmet";
import styled from "@emotion/styled";
import { useFillQuestionnaire } from "../../utils/questionnaire";
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
  message,
} from "antd";
import "antd/dist/antd.css";
import { useAsync } from "../../utils/use-async";
import axios from "axios";
import dayjs from "dayjs";

import pawImge from "../../assets/qisicat.svg";

// FIXME
const apiUrl = "http://121.36.47.113:3000";

export const QuestionnaireFill = () => {
  console.log("进入 QuestionnaireFill");
  // http://localhost:3000/fill/xZE^tyr81
  const location = useLocation();
  const arr = location.pathname.split("/");
  const openId = arr[arr.length - 1];
  const {
    data: questionnaire,
    isLoading,
    error,
  } = useFillQuestionnaire(openId);

  const { Content, Footer } = Layout;

  const [loading, setIsLoading] = useState(true);
  const [answer, setAnswer] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);
  const [errorMessage, setErrorMessage] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [reload, setReload] = useState(false);
  const [isExpired, setIsExpired] = useState(false);

  const currenttime = dayjs();
  const {
    run,
    isLoading: submitLoading,
    error: submitError,
  } = useAsync(undefined, {
    throwOnError: true,
  });

  useEffect(() => {
    if (!isLoading && questionnaire !== undefined && answer.length === 0) {
      if (currenttime > questionnaire.endtime) {
        setIsExpired(true);
      }
      for (const question of questionnaire.questions) {
        const defaultAnswer = {
          no: question.no,
          type: question.type,
          answer: null,
        };
        answer.push(defaultAnswer);
        const defaultError = false;
        errorMessage.push(defaultError);
      }
      setAnswer(answer);
      setErrorMessage(errorMessage);
    }
  }, [questionnaire]);

  useEffect(() => {
    (async () => {
      if (questionnaire !== undefined && isSubmit === true) {
        const submitAnswer = {
          id: questionnaire.id,
          answer: answer,
        };

        for (const question of questionnaire.questions) {
          const ques_index = questionnaire.questions.indexOf(question);
          if (
            question.isNecessary === true &&
            (answer[ques_index].answer === null ||
              answer[ques_index].answer === "" ||
              answer[ques_index].answer.length === 0)
          ) {
            errorMessage[ques_index] = true;
          } else {
            errorMessage[ques_index] = false;
          }
        }
        setErrorMessage(errorMessage);
        if (errorMessage.indexOf(true) !== -1) {
          setIsSubmit(false);
          Modal.error({
            title: "当前问卷还有未填写正确的地方哦",
            content:
              "请确保所有问题都已按照要求填写，点击确定页面将提示未按照规范填写的问题",
            okText: "确定",
          });
        } else {
          try {
            await run(
              axios.post(
                `${apiUrl}/questionnaires/${openId}/submit`,
                submitAnswer
              )
            );
            message.success("提交问卷成功");
            setIsSuccess(true);
          } catch (e) {
            // onError(e);
            message.success("提交问卷失败");
          }
        }
      }
    })();
  }, [isSubmit]);

  useDeepCompareEffect(() => {
    if (answer.length !== 0) {
      for (const question of questionnaire.questions) {
        const ques_index = questionnaire.questions.indexOf(question);
        if (
          question.isNecessary === true &&
          (answer[ques_index].answer === null ||
            answer[ques_index].answer === "" ||
            answer[ques_index].answer.length === 0)
        ) {
          errorMessage[ques_index] = true;
        } else {
          errorMessage[ques_index] = false;
        }
      }
      setErrorMessage(errorMessage);
    }
  }, [answer, errorMessage]);

  function generateKey() {
    return Number(Math.random().toString().substr(3, 5) + Date.now()).toString(
      36
    );
  }

  // 单选题显示
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
          <Radio.Group
            defaultValue={answer.length === 0 ? null : answer[index].answer}
            onChange={(e) => {
              answer[index].answer = e.target.value;
              setAnswer(answer);
              setReload((reload) => !reload);
            }}
          >
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
        {errorMessage[quest_display_id - 1] === true ? (
          <ErrorMessage>请选择选项</ErrorMessage>
        ) : (
          <></>
        )}
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
          <Checkbox.Group
            defaultValue={answer.length === 0 ? null : answer[index].answer}
            onChange={(checkedValues) => {
              checkedValues.sort(function (a, b) {
                return a - b;
              });
              answer[index].answer = checkedValues;
              setAnswer(answer);
              setReload((reload) => !reload);
            }}
          >
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
        {errorMessage[quest_display_id - 1] === true ? (
          <ErrorMessage>请至少选择一个选项</ErrorMessage>
        ) : (
          <></>
        )}
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
          <InputArea
            defaultValue={answer.length === 0 ? null : answer[index].answer}
            onChange={(e) => {
              answer[index].answer = e.target.value;
              setAnswer(answer);
            }}
          ></InputArea>
        </QuestionContent>
        {errorMessage[quest_display_id - 1] ? (
          <ErrorMessage>请输入文本题答案</ErrorMessage>
        ) : (
          <></>
        )}
        <Divider />
      </Question>
    );
  };

  return isLoading ? (
    <Spin
      size={"large"}
      style={{
        margin: "10rem auto",
      }}
    />
  ) : isExpired === true ? (
    <SubmitSuccessContent>
      <SubmitSuccess>问卷已结束发布，无法填写和提交</SubmitSuccess>
    </SubmitSuccessContent>
  ) : isSuccess === false ? (
    <Layout
      className="layout"
      style={{
        display: "flex",
        textAlign: "center",
        alignItems: "center",
      }}
    >
      <Helmet>
        <title>{questionnaire.title}</title>
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
          {questionnaire.questions.map(
            (question, index, errorMessage, setErrorMessage) => {
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
            }
          )}
          <div style={{ paddingBottom: "20px" }}>
            <Button
              loading={submitLoading}
              type="primary"
              size="large"
              onClick={() => {
                setIsSubmit(true);
              }}
            >
              提交问卷
            </Button>
          </div>
        </div>
      </Content>
      <Footer>问卷喵 提供技术支持</Footer>
    </Layout>
  ) : (
    <SubmitSuccessContent>
      <SubmitSuccess>您的答卷已提交，感谢您的参与 !</SubmitSuccess>
    </SubmitSuccessContent>
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
  margin-bottom: 64px;
`;

const ErrorMessage = styled.div`
  color: Red;
  height: 20px;
  margin-top: 10px;
  font-size: 15px;
`;

const SubmitSuccess = styled.div`
  margin: 40px auto 10px;
  padding: 30px 0;
  font-size: 30px;
  position: relative;
  height: 100px;
  width: 500px;
  text-align: center;
  background: white;
  border: 2px, solid, black;
  position: relative;
  color: #40a9ff;
`;

const SubmitSuccessContent = styled.div`
  height: 90%;
  width: 100%;
  position: absolute;
  background-color: #f5f5f5;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position-x: 50%, 50%;
  background-position-y: 50px;
  background-image: url(${pawImge});
  background-size: 700px, 600px;
`;

const InputArea = styled(Input)``;
