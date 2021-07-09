import { Checkbox } from "antd";
import styled from "@emotion/styled";
import { FormOutlined, DeleteOutlined } from "@ant-design/icons";
import { useState } from "react";

import { MultipleChoice } from "../MultipleChoice/index";

export const MultipleQuesList = (props) => {
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

  function generateKey() {
    return Number(Math.random().toString().substr(3, 5) + Date.now()).toString(
      36
    );
  }

  const deleteQues = () => {
    const newQuestionList = questionList.filter(
      (ques) => ques !== questionItem
    );
    setQuestionList(newQuestionList);
  };

  if (isEdit === false) {
    return (
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
            <Checkbox.Group>
              {ques_option.map((choice) => {
                return (
                  <CheckboxRow key={generateKey()}>{choice.text}</CheckboxRow>
                );
              })}
            </Checkbox.Group>
          </SubjectRow>
          <SubjectMask>
            {hovering ? (
              <SubjectControlBar>
                <SubjectBarButton>
                  <FormOutlined
                    onClick={() => {
                      setIsEdit(true);
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
    );
  } else {
    return (
      <MultipleChoice
        questionList={questionList}
        setQuestionList={setQuestionList}
        editorStatus={editorStatus}
        setEditorStatus={setEditorStatus}
        editorType={editorType}
        setEditorType={setEditorType}
        isUpdate={isEdit}
        currQues={questionItem}
        setIsUpdate={setIsEdit}
      ></MultipleChoice>
    );
  }
};

const QuestionnaireSubject = styled.div`
  position: relative;
  width: 100%;
  padding: 0;
  overflow: hidden;
  min-height: 144px;
  border: 1px dashed transparent;
`;

const QuestionnaireSubjectInner = styled.div`
  width: 100%;
  margin: 0px auto;
`;

const SubjectRow = styled.div`
  margin-left: 8px;
  margin-bottom: 8px;
  width: 100%;
  text-align: left;
`;

const CheckboxRow = styled(Checkbox)`
  width: 100%;
  margin-left: 8px;
  margin-bottom: 8px;
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
  width: 48px;
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
  margin-bottom: 20px;
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
