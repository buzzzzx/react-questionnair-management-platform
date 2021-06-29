import { Dropdown, Menu, Modal, Button } from "antd";
import { ButtonNoPadding } from "../../components/lib";

export const More = ({ questionnaire, operations, operation1, operation2 }) => {
  const editQuestionnaire = () => {};
  const deleteQuestionnaire = () => {};
  const confirmDeleteProject = (id) => {
    Modal.confirm({
      title: "确定删除这个问卷吗？",
      content: "点击确定删除",
      okText: "确定",
      onOk() {
        deleteQuestionnaire({ id });
      },
    });
  };
  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key={"edit"}>
            <ButtonNoPadding type={"link"} onClick={editQuestionnaire}>
              {operation1}
            </ButtonNoPadding>
          </Menu.Item>
          <Menu.Item key={"delete"}>
            <ButtonNoPadding
              type={"link"}
              onClick={() => confirmDeleteProject()}
            >
              {operation2}
            </ButtonNoPadding>
          </Menu.Item>
        </Menu>
      }
    >
      <Button type={"link"}>{operations}</Button>
    </Dropdown>
  );
};
