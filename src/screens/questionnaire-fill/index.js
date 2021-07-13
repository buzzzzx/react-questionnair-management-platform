import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
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
  const { Link } = Anchor;

  const [loading, setIsLoading] = useState(true);
  const [answer, setAnswer] = useState([]);

  // TODO 有些组件上有 id="question.no" 这是啥意思，我怀疑你这里写得有问题
  // 2021-7-13 Anak7n
  const {
    run,
    isLoading: submitLoading,
    error: submitError,
  } = useAsync(undefined, {
    throwOnError: true,
  });

  useEffect(() => {
    if (!isLoading && questionnaire !== undefined && answer.length === 0) {
      console.log("questionnaire", questionnaire.questions.length);
      for (const question of questionnaire.questions) {
        const defaultAnswer = {
          no: question.no,
          type: question.type,
          answer: null,
        };
        answer.push(defaultAnswer);
      }
      setAnswer(answer);
      console.log("初始情况下，answer的值", answer);
    }
  }, [questionnaire]);

  console.log("questionnaire", questionnaire);

  function generateKey() {
    return Number(Math.random().toString().substr(3, 5) + Date.now()).toString(
      36
    );
  }

  const onSubmit = async () => {
    console.log("点击提交问卷答案");
    const submitAnswer = {
      id: questionnaire.id,
      answer: answer,
    };

    //判断是否有必填问题未填
    // FIXME 这里有几个 bug：1. 自动定位；2. 判断文本题未填，应该还要加一个判断是否为空字符
    for (const question of questionnaire.questions) {
      const question_id = 3;
      const return_location = "#" + String(question_id);
      const ques_index = questionnaire.questions.indexOf(question);
      if (question.isNecessary === true && answer[ques_index].answer === null) {
        console.log("进入这个页面");
        Modal.error({
          title: "当前问卷还有未填写正确的地方哦",
          content:
            "请确保所有问题都已按照要求填写，点击确定页面将自动定位到第一个未按照规范填写的问题",
          okText: <a href={return_location}>确定</a>,
        });
        break;
      }
    }
    console.log("最终提交的问卷答案", submitAnswer);

    // 2021-7-13 Anak7n
    try {
      await run(
        axios.post(`${apiUrl}/questionnaires/${openId}/submit`, submitAnswer)
      );
      message.success("提交问卷成功");
    } catch (e) {
      // onError(e);
      message.success("提交问卷失败");
    }
  };

  // 单选题显示
  const SingleChoiceDisplay = (props) => {
    const { question, index } = props;
    const quest_display_id = index + 1;
    return (
      <Question key={generateKey()}>
        <QuestionTitle>
          <span>{quest_display_id + "."}</span>
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
          <span>{quest_display_id + "."}</span>
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
          <span>{quest_display_id + "."}</span>
          <span>{question.title}</span>
          {question.isNecessary ? <QuestionRequire>*</QuestionRequire> : <></>}
        </QuestionTitle>

        {question.remarks !== null ? <div>{question.remarks}</div> : <></>}
        <QuestionContent>
          <Input
            defaultValue={answer.length === 0 ? null : answer[index].answer}
            onChange={(e) => {
              answer[index].answer = e.target.value;
              setAnswer(answer);
            }}
          ></Input>
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
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: "none",
      }}
    >
      <Content
        style={{
          padding: "0 50px",
          textAlign: "center",
          alignItems: "center",
          justifyContent: "center",
          background: "white",
          height: "98%",
          overflow: "auto",
        }}
      >
        <Title>{questionnaire.title}</Title>
        {questionnaire.description === null ? (
          <InputDescription>{questionnaire.description}</InputDescription>
        ) : (
          <></>
        )}
        <Divider />
        <div
          style={{
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
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
            <Button
              loading={submitLoading}
              type="primary"
              size="large"
              onClick={onSubmit}
            >
              提交问卷
            </Button>
          </div>
        </div>
      </Content>
      <Footer>问卷喵 提供技术支持</Footer>
    </Layout>
  );
};

// const Questions = styled.div`
//   width:100%;
//   text-align: center;
//   align-items: center;
//   justify-content: center;
//   height: 100%;
// `;

const Title = styled.div`
  line-height: 20px;
  text-align: center;
  width: 800px;
  padding: 40px 2% 20px;
  font-size: 35px;
  color: #0095ff;
`;

const Question = styled.div`
  padding: 5px;
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

const InputDescription = styled(Input)`
  font-size: 18px;
  margin-bottom: 64px;
`;
