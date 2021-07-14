import { List, Typography, Divider, Popover } from "antd";
import styled from "@emotion/styled";
import { useQuestionnaires } from "../../utils/questionnaire";

export const QuestionnairesPopover = () => {
  const { data: questionnaires = [], refetch } = useQuestionnaires();

  const noReleased = questionnaires.filter(
    (questionnaire) => questionnaire.status === 1
  );
  const released = questionnaires.filter(
    (questionnaire) => questionnaire.status === 2
  );
  const ended = questionnaires.filter(
    (questionnaire) => questionnaire.status === 3
  );

  const content = (
    <ContentContainer>
      <Typography.Text type={"secondary"}>未发布问卷</Typography.Text>
      <List>
        {noReleased?.map((questionnaire) => (
          <List.Item key={questionnaire.id}>
            <List.Item.Meta title={questionnaire.title} />
          </List.Item>
        ))}
      </List>
      <Divider />
      <Typography.Text type={"secondary"}>已发布问卷</Typography.Text>
      <List>
        {released?.map((questionnaire) => (
          <List.Item key={questionnaire.id}>
            <List.Item.Meta title={questionnaire.title} />
          </List.Item>
        ))}
      </List>
      <Divider />
      <Typography.Text type={"secondary"}>已结束问卷</Typography.Text>
      <List>
        {ended?.map((questionnaire) => (
          <List.Item key={questionnaire.id}>
            <List.Item.Meta title={questionnaire.title} />
          </List.Item>
        ))}
      </List>
    </ContentContainer>
  );

  return (
    <Popover
      onVisibleChange={() => refetch()}
      placement={"bottom"}
      content={content}
    >
      <span>问卷</span>
    </Popover>
  );
};

const ContentContainer = styled.div`
  min-width: 30rem;
`;
