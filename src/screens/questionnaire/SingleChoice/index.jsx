import styled from "@emotion/styled";
import {
  AliwangwangOutlined,
  PlusCircleOutlined,
  CloseOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { Input, Checkbox, Button, Form } from "antd";
import { useState } from "react";

export const SingleChoice = (props) => {
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
  const [remarks, setRemarks] = useState(currQues.remarks);
  const [option, setChoiceOption] = useState(currQues.option);
  const [isnecessary, setIsNecessary] = useState(currQues.isnecessary);
  const [isNote, setIsNote] = useState(
    currQues.remarks === null ? false : true
  );

  const option_no = () => {
    return Number(Math.random().toString().substr(3, 5) + Date.now()).toString(
      36
    );
  };

  const add = () => {
    let newChoices = [...option, { no: option_no(), text: "" }];
    form.setFieldsValue({ option: newChoices });
    return setChoiceOption(newChoices);
  };

  const del = (deleteId) => {
    const newChoicesItem = option.filter((item) => item.no !== deleteId);
    form.setFieldsValue({ choiceItem: newChoicesItem });
    return setChoiceOption(newChoicesItem);
  };

  const onChange = (no, e) => {
    const newChoiceItems = JSON.parse(JSON.stringify(option));
    console.log(newChoiceItems);
    const choice = newChoiceItems.find((item) => item.no === no);
    choice["text"] = e.target.value;
    console.log(option);
    setChoiceOption(newChoiceItems);
  };

  const choices = option.map((item) => {
    return (
      <Form.Item key={item.no} name={["option", item.no, "text"]}>
        <EditorRow>
          <EditorRowTitle>
            <UnorderedListOutlined></UnorderedListOutlined>
          </EditorRowTitle>
          <EditorRowContent>
            <EditorInput
              defaultValue={item.text}
              onChange={(e) => {
                onChange(item.no, e);
              }}
            />
            <Button
              type="circle"
              onClick={() => del(item.no)}
              icon={<CloseOutlined />}
            ></Button>
          </EditorRowContent>
        </EditorRow>
      </Form.Item>
    );
  });

  const onSubmit = () => {
    var init_id = 0;
    for (var option_item of option) {
      option_item.no = ++init_id;
    }

    const questionItem = {
      no: currQues.no,
      type: 0,
      title: title,
      isnecessary: isnecessary,
      remarks: isNote ? remarks : null,
      option: option,
    };

    if (isUpdate && questionItem === currQues) {
      setEditorStatus("NotEdit");
      setEditorType(null);
    } else if (isUpdate && questionItem !== currQues) {
      var editQues = questionList.find((ques) => ques.no === questionItem.no);
      editQues.title = questionItem.title;
      editQues.isnecessary = questionItem.isnecessary;
      editQues.remarks = questionItem.remarks;
      editQues.option = questionItem.option;
      setQuestionList(questionList);
      console.log(questionList);
      setEditorStatus("NotEdit");
      setEditorType(null);
      setIsUpdate(false);
    } else {
      questionList.push(questionItem);
      setQuestionList(questionList);
      setEditorStatus("NotEdit");
      setEditorType(null);
    }

    console.log("创建的单选题为", questionItem);
    console.log("创建后的问卷列表为", questionList);
  };

  const cancel = () => {
    setEditorStatus("NotEdit");
    setEditorType(null);
    if (isUpdate) {
      setQuestionList(questionList);
      setIsUpdate(false);
    }
    console.log("点击取消后的questionlist", questionList);
  };

  return (
    <div>
      <EditorType>
        <EditorIcon>
          <AliwangwangOutlined></AliwangwangOutlined>
        </EditorIcon>
        <span>单选题</span>
      </EditorType>

      <Form form={form} name="quesionItem">
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

        <Form.Item name="note">
          <EditorRow>
            <EditorRowContent>
              <EditorCheckbox>
                <EditorCheckboxInner
                  checked={isnecessary}
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

        <Form.Item>{choices}</Form.Item>

        <Form.Item>
          <EditorRow>
            <EditorRowContent onClick={add}>
              <EditorCreateOption>
                <EditorIcon>
                  <PlusCircleOutlined></PlusCircleOutlined>
                </EditorIcon>
                <EditorCheckboxContent>新建选项</EditorCheckboxContent>
              </EditorCreateOption>
            </EditorRowContent>
          </EditorRow>
        </Form.Item>

        <Form.Item>
          <EditorButton>
            <ButtonInner onClick={onSubmit}>确定</ButtonInner>
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

const EditorCreateOption = styled.div`
  width: 100%;
  height: 36px;
  border: 1px dashed #ddd;
  display: flex;
  align-items: center;
  cursor: pointer;
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

const deleteChoice = styled.div`
  margin-left: 5px;
  font-size: 16px;
  font-style: normal;
`;
