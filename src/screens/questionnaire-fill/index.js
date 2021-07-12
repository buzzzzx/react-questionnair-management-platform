import { useLocation } from "react-router-dom";
import {
  useFillQuestionnaire,
  useQuestionnaire,
} from "../../utils/questionnaire";
import { Form, Spin } from "antd";

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

  // console.log(questionnaire);

  return <div>问卷填写</div>;

  // return isLoading ? (
  //   <Spin size={"large"} />
  // ) : (
  //   <Form>
  //     <Form.Item>{questionnaire.title}</Form.Item>
  //     {questionnaire.questions.map((question) => (
  //       <Form.Item key={question.id}>{question.title}</Form.Item>
  //     ))}
  //   </Form>
  // );
};
