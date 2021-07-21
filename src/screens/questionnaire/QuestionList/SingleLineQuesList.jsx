import { Input, Divider, Modal, Tooltip } from "antd";
import styled from "@emotion/styled";
import { useState } from "react";
import { FormOutlined, DeleteOutlined } from "@ant-design/icons";
import { SingleLineText } from "../SingleLineText";

export const SingleLineQuesList = (props) => {
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

  const deleteQues = () => {
    Modal.confirm({
      title: "确定删除这个问题吗",
      content: "点击确定删除",
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
              <span>{ques_id + ". "}</span>
              <span>{questionItem.title}</span>
              {questionItem.isNecessary ? (
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
              <SubjectInput></SubjectInput>
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
        <Divider />
      </>
    );
  } else {
    return (
      <SingleLineText
        questionList={questionList}
        setQuestionList={setQuestionList}
        editorStatus={editorStatus}
        setEditorStatus={setEditorStatus}
        editorType={editorType}
        setEditorType={setEditorType}
        isUpdate={isEdit}
        currQues={questionItem}
        setIsUpdate={setIsEdit}
      ></SingleLineText>
    );
  }
};

const QuestionnaireSubject = styled(Tooltip)`
  position: relative;
  width: 100%;
  padding: 20px 0;
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

const SubjectInput = styled(Input)`
  outline: none;
  border: 1px solid #dddddd;
  width: 100%;
  resize: none;
  padding: 0 11px;
  height: 36px;
`;

const SubjectMask = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;
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
