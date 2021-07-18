import { useQuestionnaireId } from "../../utils/url";
import { useAnswers, useDeleteAnswers } from "../../utils/answer";
import styled from "@emotion/styled";
import { ButtonNoPadding, ErrorBox, Row } from "../../components/lib";
import { List } from "./list";
import { Helmet } from "react-helmet";
import { useQuestionnaire } from "../../utils/questionnaire";
import { useAnswersQueryKey, useAnswersSearchParam } from "./util";
import { message, Modal } from "antd";
import { AnswerSelector } from "./answer-selector";

export const QuestionnaireAnswerList = () => {
  // TODO 答卷为 0 的时候
  const [param, setParam] = useAnswersSearchParam();
  const id = useQuestionnaireId();
  const { data: answers, loading, error } = useAnswers(id, param);
  const { mutateAsync: deleteAllAnswers } = useDeleteAnswers(
    useAnswersQueryKey(id)
  );
  const { data: questionnaire } = useQuestionnaire(id);

  // // 測試數據
  // const answers = [
  //   {
  //     answerId: 12,
  //     pin: 1,
  //     ip: "233.222.222.222",
  //     location: "四川成都",
  //     answerTime: 1626491463,
  //     answerDuration: 8,
  //   },
  //   {
  //     answerId: 13,
  //     pin: 2,
  //     ip: "233.112.222.222",
  //     location: "重庆",
  //     answerTime: 1626491363,
  //     answerDuration: 10,
  //   },
  // ];
  // const loading = false;
  // const error = undefined;

  const deleteHandler = () => {
    Modal.confirm({
      title: `确定清空所有答卷吗？`,
      content: "请注意，清空所有答卷将无法恢复！",
      okText: "确定",
      cancelText: "取消",
      onOk() {
        const deletes = answers.map((answer) => answer.answerId);
        console.log(answers, deletes);
        deleteAllAnswers({ ids: deletes })
          .then(() => {
            message.success("清空答卷成功");
          })
          .catch((e) => {
            message.error("清空答卷失败");
          });
      },
    });
  };

  return (
    <ScreenContainer>
      <Helmet>
        <title>查看答卷</title>
      </Helmet>
      <Row between={true}>
        <h1>{questionnaire?.title} - 答卷列表</h1>
        <ButtonNoPadding danger type={"link"} onClick={() => deleteHandler()}>
          清空答卷
        </ButtonNoPadding>
      </Row>
      <AnswerSelector param={param} setParam={setParam} />
      <ErrorBox error={error} />
      <List questionnaireId={id} list={answers} loading={loading} />
    </ScreenContainer>
  );
};

const ScreenContainer = styled.div`
  padding: 3.2rem;
  width: 100%;
  display: flex;
  flex-direction: column;
`;
