import { SortableContainer, SortableElement } from "react-sortable-hoc";
import arrayMove from "array-move";
import { SingleQuesList } from "./SingleQuesList";
import { MultipleQuesList } from "./MultipleQuesList";
import { SingleLineQuesList } from "./SingleLineQuesList";

export const QuestionList = (props) => {
  const {
    questionList,
    setQuestionList,
    editorStatus,
    setEditorStatus,
    editorType,
    setEditorType,
    isUpdate,
    setIsUpdate,
  } = props;

  var initial_id = 0;

  function generateId() {
    return ++initial_id;
  }

  function generateKey() {
    return Number(Math.random().toString().substr(3, 5) + Date.now()).toString(
      36
    );
  }

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setQuestionList(arrayMove(questionList, oldIndex, newIndex));
  };

  const SortableList = SortableContainer(({ children }) => {
    return <ul>{children}</ul>;
  });

  const SortableItem = SortableElement(
    ({
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
    }) => {
      if (questionItem.type === 0) {
        return (
          <SingleQuesList
            ques_id={ques_id}
            questionItem={questionItem}
            questionList={questionList}
            setQuestionList={setQuestionList}
            editorStatus={editorStatus}
            setEditorStatus={setEditorStatus}
            editorType={editorType}
            setEditorType={setEditorType}
            isUpdate={isUpdate}
            setIsUpdate={setIsUpdate}
          ></SingleQuesList>
        );
      } else if (questionItem.type === 1) {
        return (
          <MultipleQuesList
            ques_id={ques_id}
            questionItem={questionItem}
            questionList={questionList}
            setQuestionList={setQuestionList}
            editorStatus={editorStatus}
            setEditorStatus={setEditorStatus}
            editorType={editorType}
            setEditorType={setEditorType}
            isUpdate={isUpdate}
            setIsUpdate={setIsUpdate}
          ></MultipleQuesList>
        );
      } else {
        return (
          <SingleLineQuesList
            ques_id={ques_id}
            questionItem={questionItem}
            questionList={questionList}
            setQuestionList={setQuestionList}
            editorStatus={editorStatus}
            setEditorStatus={setEditorStatus}
            editorType={editorType}
            setEditorType={setEditorType}
            isUpdate={isUpdate}
            setIsUpdate={setIsUpdate}
          ></SingleLineQuesList>
        );
      }
    }
  );

  return (
    <SortableList onSortEnd={onSortEnd} distance={10}>
      {questionList.map((questionItem, index) => (
        <SortableItem
          key={generateKey()}
          index={index}
          ques_id={generateId()}
          questionItem={questionItem}
          questionList={questionList}
          setQuestionList={setQuestionList}
          editorStatus={editorStatus}
          setEditorStatus={setEditorStatus}
          editorType={editorType}
          setEditorType={setEditorType}
          isUpdate={isUpdate}
          setIsUpdate={setIsUpdate}
        />
      ))}
    </SortableList>
  );
};
