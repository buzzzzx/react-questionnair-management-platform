import { ErrorBox, Row, ScreenContainer } from "../../components/lib";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { Button, Divider, message, Modal } from "antd";
import {
  useQuestionnairesQueryKey,
  useQuestionnairesSearchParam,
} from "./util";
import {
  useDeleteQuestionnaires,
  useQuestionnaires,
} from "../../utils/questionnaire";
import { useDebounce } from "../../utils";
import { DeleteOutlined } from "@ant-design/icons";
import { useState } from "react";
import { CreateButton } from "../../components/create-button";

export const QuestionnaireListScreen = () => {
  const [params, setParams] = useQuestionnairesSearchParam();

  const {
    isLoading,
    error,
    data: list = [],
  } = useQuestionnaires(useDebounce(params, 300));

  const [deletes, setDeletes] = useState([]);
  const { mutateAsync: deleteQuestionnaires } = useDeleteQuestionnaires(
    useQuestionnairesQueryKey()
  );

  const [hoverQuestionnaire, setHoverQuestionnaire] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const deleteHandler = () => {
    Modal.confirm({
      title: `确定删除这 ${deletes.length} 个问卷吗？`,
      content: "点击确定删除",
      okText: "确定",
      cancelText: "取消",
      onOk() {
        // console.log("删除", deletes.length);
        deleteQuestionnaires({ ids: deletes })
          .then(() => {
            message.success("删除成功");
            setDeletes([]);
          })
          .catch((e) => {
            message.error("删除失败");
          });
      },
    });
  };

  return (
    <ScreenContainer>
      <Row
        style={{ width: "100%", margin: "10px 10px 10px 25px" }}
        between={true}
      >
        <Row gap={true}>
          <h1>问卷列表</h1>
          <CreateButton />
          {deletes.length ? (
            <Button onClick={deleteHandler} icon={<DeleteOutlined />} danger>
              {`删除选中 (${deletes.length})`}
            </Button>
          ) : null}
        </Row>
        <SearchPanel params={params} setParams={setParams} />
      </Row>

      <Divider style={{ padding: 0, margin: 0 }} />

      <ErrorBox error={error} />
      <List
        loading={isLoading}
        list={list}
        hoverQuestionnaire={hoverQuestionnaire}
        setHoverQuestionnaire={setHoverQuestionnaire}
        showAll={showAll}
        setShowAll={setShowAll}
        deletes={deletes}
        setDeletes={setDeletes}
      />
    </ScreenContainer>
  );
};
