import { Radio, Space, Divider, Modal } from "antd";
import styled from "@emotion/styled";
import { useState } from "react";
import { FormOutlined, DeleteOutlined } from "@ant-design/icons";

import { SingleChoice } from "../SingleChoice/index";

export const SingleQuesList = (props) => {
  const {
    ques_id,
    questionItem,
    questionList,
    setQuestionList,
    editorStatus,
    setEditorStatus,
    editorType,
    setEditorType,
    isUpdate,
    setIsUpdate,
  } = props;
  const [hovering, setHovering] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const ques_option = Object.values(questionItem.option);

  function next_id() {
    var current_id = 0;
    return function () {
      return ++current_id;
    };
  }

  const option_id = next_id();

  const deleteQues = () => {
    Modal.confirm({
      title: "确定删除这个问题吗",
      content: "点击确定删除这个问题",
      okText: "确定",
      cancelText: "取消",
      onOk() {
        const newQuestionList = questionList.filter(
          (ques) => ques !== questionItem
        );
        setQuestionList(newQuestionList);
      },
    });
  };

  if (isEdit === false) {
    return (
      <>
        <QuestionnaireSubject
          onMouseEnter={() => {
            setHovering(true);
          }}
          onMouseLeave={() => {
            setHovering(false);
          }}
        >
          <QuestionnaireSubjectInner>
            <SubjectRow>
              <span>{ques_id + "."}</span>
              <span>{questionItem.title}</span>
              {questionItem.isnecessary ? (
                <SubjectRowRequire>*</SubjectRowRequire>
              ) : (
                <></>
              )}
              {questionItem.remarks !== null ? (
                <SubjectRemarks>{questionItem.remarks}</SubjectRemarks>
              ) : (
                <></>
              )}
            </SubjectRow>
            <SubjectRow>
              <RadioGroup>
                <Space direction="vertical">
                  {ques_option.map((choice) => {
                    return (
                      <RadioRow key={String(ques_id) + String(option_id)}>
                        {choice.text}
                      </RadioRow>
                    );
                  })}
                </Space>
              </RadioGroup>
            </SubjectRow>
            <SubjectMask>
              {hovering ? (
                <SubjectControlBar>
                  <SubjectBarButton>
                    <FormOutlined
                      onClick={() => {
                        setIsEdit(true);
                        console.log("当前进入编辑状态", isEdit);
                      }}
                    />
                  </SubjectBarButton>
                  <SubjectBarButton>
                    <DeleteOutlined onClick={deleteQues} />
                  </SubjectBarButton>
                </SubjectControlBar>
              ) : (
                <></>
              )}
            </SubjectMask>
          </QuestionnaireSubjectInner>
        </QuestionnaireSubject>
        <Divider />
      </>
    );
  } else {
    console.log("开始编辑问题");
    return (
      <SingleChoice
        questionList={questionList}
        setQuestionList={setQuestionList}
        editorStatus={editorStatus}
        setEditorStatus={setEditorStatus}
        editorType={editorType}
        setEditorType={setEditorType}
        isUpdate={isEdit}
        currQues={questionItem}
        setIsUpdate={setIsEdit}
      ></SingleChoice>
    );
  }
};

const QuestionnaireSubject = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  min-height: 144px;
  border: 1px dashed transparent;
`;

const QuestionnaireSubjectInner = styled.div`
  width: 100%;
  margin: 0px;
`;

const SubjectRow = styled.div`
  margin-left: 8px;
  margin-bottom: 8px;
  width: 100%;
  text-align: left;
`;

const RadioRow = styled(Radio)`
  width: 100%;
  margin-bottom: 8px;
  cursor: pointer;
  display: inline-block;
  text-align: left;
`;

const RadioGroup = styled(Radio.Group)`
  box-sizing: border-box;
  user-select: none;
  font-family: "PingFang SC", "Microsoft YaHei", "Helvetica Neue", Helvetica,
    Arial, sans-serif;
  margin-left: 8px;
  text-align: left;
`;

const SubjectMask = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;
  width: 100%;
`;

const SubjectControlBar = styled.div`
  width: 80px;
  background: #ededed;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  align-items: center;
`;

const SubjectBarButton = styled.div`
  width: 100%;
  cursor: pointer;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
  margin-top: 40px;
  font-size: x-large;
  color: #0052cc;
`;

const SubjectRowRequire = styled.span`
  color: red;
  vertical-align: middle;
  margin-left: 5px;
`;

const SubjectRemarks = styled.div`
  font-size: 12px;
  color: #999;
  margin-top: 3px;
`;
