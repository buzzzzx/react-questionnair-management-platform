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
    console.log(oldIndex, newIndex);
    setQuestionList(arrayMove(questionList, oldIndex, newIndex));
    console.log("交换后的questionList", questionList);
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
      console.log("接收到的questionItem", questionItem);
      if (questionItem.type === 0) {
        console.log("当前显示的问题类型为单选题");
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
        console.log("当前显示的问题类型为多选题");
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
        console.log("当前显示的问题类型为单行文本题");
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
