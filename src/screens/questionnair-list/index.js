// TODO 可以使用 AntDesign 的 PageHeader 来做每个 questionnaire 的展示
import { Row, ScreenContainer } from "../../components/lib";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { Button } from "antd";

export const QuestionnaireListScreen = () => {
  return (
    <ScreenContainer>
      <Row between={true}>
        <Row gap={true}>
          <h1>问卷列表</h1>
          <Button type={"primary"} onClick={() => {}}>
            创建问卷
          </Button>
        </Row>
        <SearchPanel />
      </Row>

      {/*<ErrorBox error={error} />*/}
      <List />
    </ScreenContainer>
  );
};
