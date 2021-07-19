import styled from "@emotion/styled";
import { AliwangwangOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Input, Checkbox, Button, Form } from "antd";
import { useState } from "react";

export const SingleLineText = (props) => {
  const {
    questionList,
    setQuestionList,
    editorStatus,
    setEditorStatus,
    editorType,
    setEditorType,
    isUpdate,
    currQues,
    setIsUpdate,
  } = props;

  const [form] = Form.useForm();
  const [title, setTitle] = useState(currQues.title);
  const [isNecessary, setIsNecessary] = useState(currQues.isNecessary);
  const [isNote, setIsNote] = useState(
    currQues.remarks === null ? false : true
  );
  const [remarks, setRemarks] = useState(currQues.remarks);

  const generated = () => {
    return Number(Math.random().toString().substr(3, 5) + Date.now()).toString(
      36
    );
  };

  const onFinish = (values) => {
    const questionItem = {
      no: currQues.no,
      type: 2,
      title: title,
      isNecessary: isNecessary,
      remarks: remarks,
    };

    if (isUpdate && questionItem === currQues) {
      setEditorStatus("NotEdit");
      setEditorType(null);
    } else if (isUpdate && questionItem !== currQues) {
      var editQues = questionList.find((ques) => ques.no === questionItem.no);
      editQues.title = questionItem.title;
      editQues.isNecessary = questionItem.isNecessary;
      editQues.remarks = questionItem.remarks;
      setQuestionList(questionList);
      setEditorStatus("NotEdit");
      setEditorType(null);
      setIsUpdate(false);
    } else {
      questionList.push(questionItem);
      setQuestionList(questionList);
      setEditorStatus("NotEdit");
      setEditorType(null);
    }
  };

  const cancel = () => {
    setEditorStatus("NotEdit");
    setEditorType(null);
    if (isUpdate) {
      setIsUpdate(false);
    }
  };

  return (
    <div>
      <EditorType>
        <EditorIcon>
          <AliwangwangOutlined></AliwangwangOutlined>
        </EditorIcon>
        <span>单行文本题</span>
      </EditorType>

      <Form
        form={form}
        name="quesionItem"
        onFinish={onFinish}
        initialValues={{
          title: currQues.title,
        }}
      >
        <Form.Item name="title">
          <EditorRow>
            <EditorRowTitle>题目</EditorRowTitle>
            <EditorRowContent>
              <EditorInput
                defaultValue={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              ></EditorInput>
            </EditorRowContent>
          </EditorRow>
        </Form.Item>

        <Form.Item name="remarks">
          <EditorRow>
            <EditorRowContent>
              <EditorCheckbox>
                <EditorCheckboxInner
                  checked={isNecessary}
                  onChange={(e) => {
                    setIsNecessary(e.target.checked);
                  }}
                ></EditorCheckboxInner>
                {isUpdate ? (
                  <EditorCheckboxContent>必填</EditorCheckboxContent>
                ) : (
                  <EditorCheckboxContent>必填</EditorCheckboxContent>
                )}
              </EditorCheckbox>

              <EditorCheckbox>
                <EditorCheckboxInner
                  checked={isNote}
                  onChange={(e) => {
                    setIsNote(e.target.checked);
                  }}
                ></EditorCheckboxInner>
                <EditorCheckboxContent>备注</EditorCheckboxContent>
              </EditorCheckbox>

              <EditorCheckbox>
                {isNote ? (
                  <EditorInput
                    defaultValue={remarks}
                    onChange={(e) => {
                      setRemarks(e.target.value);
                    }}
                  ></EditorInput>
                ) : (
                  <></>
                )}
              </EditorCheckbox>
            </EditorRowContent>
          </EditorRow>
        </Form.Item>

        <Form.Item>
          <EditorButton>
            <ButtonInner htmlType="submit" type="primary">
              确定
            </ButtonInner>
            <ButtonInner onClick={cancel}>取消</ButtonInner>
          </EditorButton>
        </Form.Item>
      </Form>
    </div>
  );
};

const EditorType = styled.div`
  box-sizing: border-box;
  user-select: none;
  font-family: "PingFang SC", "Microsoft YaHei", "Helvetica Neue", Helvetica,
    Arial, sans-serif;
  text-align: left;
  margin-top: 15px;
`;

const EditorIcon = styled.i`
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  margin-left: 16px;
`;

const EditorRow = styled.div`
  display: flex;
  align-items: center;
  margin: 15px 0;
  position: relative;
`;

const EditorRowContent = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  margin-left: 40px;
  height: 36px;
`;

const EditorRowTitle = styled.div`
  position: absolute;
  left: 0;
  text-align: right;
  width: 32px;
`;

const EditorInput = styled(Input)`
  overflow: hidden;
  width: 100%;
  height: 100%;
  flex: 1;
  z-index: 5;
  display: inline-block;
  margin-right: 10px;
`;

const EditorCheckbox = styled.div`
  cursor: pointer;
  display: inline-block;
`;
const EditorCheckboxInner = styled(Checkbox)`
  box-sizing: border-box;
  user-select: none;
  font-family: "PingFang SC", "Microsoft YaHei", "Helvetica Neue", Helvetica,
    Arial, sans-serif;
`;

const EditorCheckboxContent = styled.span`
  box-sizing: border-box;
  user-select: none;
  margin: 10px;
  font-family: "PingFang SC", "Microsoft YaHei", "Helvetica Neue", Helvetica,
    Arial, sans-serif;
`;

const EditorButton = styled.div`
  width: 100%;
  text-align: center;
  box-sizing: border-box;
  user-select: none;
`;

const ButtonInner = styled(Button)`
  padding: 6px 20px;
  margin: 0 10px;
  outline: none;
  cursor: pointer;
  font-size: 14px;
`;
