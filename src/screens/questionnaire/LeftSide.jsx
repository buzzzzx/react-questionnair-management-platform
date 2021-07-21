import styled from "@emotion/styled";
import { useState } from "react";
import {
  CheckCircleOutlined,
  CheckSquareOutlined,
  MinusSquareOutlined,
} from "@ant-design/icons";
import { Menu, Modal } from "antd";

export const LeftSide = (props) => {
  const {
    editorStatus,
    setEditorStatus,
    editorType,
    setEditorType,
    ques_no,
    setQuesno,
  } = props;
  const [selectedKey, setSelectKey] = useState(null);

  return (
    <>
      <QuestionItem>问题控件</QuestionItem>
      <Menu
        className="questionnaire_items"
        theme="dark"
        mode="inline"
        selectedKeys={selectedKey}
      >
        <Menu.Item
          key="1"
          icon={<CheckCircleOutlined />}
          onClick={() => {
            if (editorStatus === "NotEdit") {
              setSelectKey(["1"]);
              setEditorType("SingleChoice");
              setEditorStatus("Edit");
              setQuesno(ques_no + 1);
            } else {
              setSelectKey(null);
              Modal.info({
                title: "当前还有一个问题未编辑完哦",
                content: "点击确定，继续编辑已有问题",
                okText: "确定",
              });
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
              setSelectKey(["2"]);
              setEditorType("MultipleChoice");
              setEditorStatus("Edit");
              setQuesno(ques_no + 1);
            } else {
              setSelectKey(null);
              Modal.info({
                title: "当前还有一个问题未编辑完哦",
                content: "点击确定，继续编辑已有问题",
                okText: "确定",
              });
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
              setSelectKey(["3"]);
              setEditorType("SingleLineText");
              setEditorStatus("Edit");
              setQuesno(ques_no + 1);
            } else {
              setSelectKey(null);
              Modal.info({
                title: "当前还有一个问题未编辑完哦",
                content: "点击确定，继续编辑已有问题",
                okText: "确定",
              });
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
