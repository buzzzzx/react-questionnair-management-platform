import { List, Typography, Divider, Popover } from "antd";
import styled from "@emotion/styled";

export const QuestionnairesPopover = () => {
  const questionnaires = [
    { name: "市场调查问卷", id: 1 },
    {
      name: "学习情况调研",
      id: 2,
    },
  ];
  const content = (
    <ContentContainer>
      <Typography.Text type={"secondary"}>已发布问卷</Typography.Text>
      <List>
        {questionnaires?.map((questionnaire) => (
          <List.Item key={questionnaire.id}>
            <List.Item.Meta title={questionnaire.name} />
          </List.Item>
        ))}
      </List>
      <Divider />
      <Typography.Text type={"secondary"}>未发布问卷</Typography.Text>
      <Divider />
      <Typography.Text type={"secondary"}>已结束问卷</Typography.Text>
    </ContentContainer>
  );

  return (
    <Popover
      // onVisibleChange={() => refetch()}
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
