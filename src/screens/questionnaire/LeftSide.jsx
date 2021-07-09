import styled from "@emotion/styled";
import {
  CheckCircleOutlined,
  CheckSquareOutlined,
  CodeSandboxCircleFilled,
  MinusSquareOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";

export const LeftSide = (props) => {
  const { editorStatus, setEditorStatus, editorType, setEditorType } = props;

  return (
    <>
      <QuestionItem>问题控件</QuestionItem>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={["4"]}>
        <Menu.Item
          key="1"
          icon={<CheckCircleOutlined />}
          onClick={() => {
            if (editorStatus === "NotEdit") {
              setEditorType("SingleChoice");
              setEditorStatus("Edit");
            } else {
              alert("当前还有一个问题未编辑完哦!");
            }
          }}
        >
          单选题
        </Menu.Item>
        <Menu.Item
          key="2"
          icon={<CheckSquareOutlined />}
          onClick={() => {
            if (editorStatus === "NotEdit") {
              setEditorType("MultipleChoice");
              setEditorStatus("Edit");
            } else {
              alert("当前还有一个问题未编辑完哦!");
            }
          }}
        >
          多选题
        </Menu.Item>
        <Menu.Item
          key="3"
          icon={<MinusSquareOutlined />}
          onClick={() => {
            if (editorStatus === "NotEdit") {
              setEditorType("SingleLineText");
              setEditorStatus("Edit");
            } else {
              alert("当前还有一个问题未编辑完哦!");
            }
          }}
        >
          单行文本题
        </Menu.Item>
      </Menu>
    </>
  );
};

const QuestionItem = styled.div`
  width: 100%;
  height: 64px;
  padding: 0px;
  align-items: center;
  position: relative;
  color: white;
  background: #001529;
  line-height: 64px;
  padding-left: 24px;
  font-size: 20px;
`;
