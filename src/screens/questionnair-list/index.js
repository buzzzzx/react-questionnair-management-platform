import { ErrorBox, Row, ScreenContainer } from "../../components/lib";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { Button } from "antd";
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
  } = useQuestionnaires(useDebounce(params, 200));

  return (
    <ScreenContainer>
      <Row between={true}>
        <Row gap={true}>
          <h1>问卷列表</h1>
          <Button type={"primary"} onClick={() => {}}>
            <Link to={"create"}>创建问卷</Link>
          </Button>
        </Row>
        <SearchPanel list={list} params={params} setParams={setParams} />
      </Row>

      <ErrorBox error={error} />
      <List loading={isLoading} list={list} />
    </ScreenContainer>
  );
};
