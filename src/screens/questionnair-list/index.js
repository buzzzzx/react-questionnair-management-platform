import { ErrorBox, Row, ScreenContainer } from "../../components/lib";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { Button, Divider } from "antd";
import { useQuestionnairesSearchParam } from "./util";
import { useQuestionnaires } from "../../utils/questionnaire";
import { useDebounce } from "../../utils";
import { Link } from "react-router-dom";

export const QuestionnaireListScreen = () => {
  const [params, setParams] = useQuestionnairesSearchParam();

  const {
    isLoading,
    error,
    data: list = [],
  } = useQuestionnaires(useDebounce(params, 300));

  return (
    <ScreenContainer>
      <Row
        style={{ width: "98%", margin: "10px 10px 10px 25px" }}
        between={true}
      >
        <Row gap={true}>
          <h1>问卷列表</h1>
          <Button type={"primary"}>
            <Link to={"create"}>创建问卷</Link>
          </Button>
        </Row>
        <SearchPanel params={params} setParams={setParams} />
      </Row>

      <Divider style={{ padding: 0, margin: 0 }} />

      <ErrorBox error={error} />
      <List loading={isLoading} list={list} />
    </ScreenContainer>
  );
};
