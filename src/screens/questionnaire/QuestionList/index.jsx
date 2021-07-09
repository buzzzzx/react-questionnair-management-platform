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

  function Generatekey() {
    return Number(Math.random().toString().substr(3, 5) + Date.now()).toString(
      36
    );
  }

  return (
    <ul>
      {questionList.map((questionItem) => {
        // 单选题
        if (questionItem.type === 0) {
          return (
            <div key={Generatekey()}>
              <SingleQuesList
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
              ></SingleQuesList>
            </div>
          );
        } else if (questionItem.type === 1) {
          return (
            <div key={Generatekey()}>
              <MultipleQuesList
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
              ></MultipleQuesList>
            </div>
          );
        } else {
          return (
            <div key={Generatekey()}>
              <SingleLineQuesList
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
              ></SingleLineQuesList>
            </div>
          );
        }
      })}
    </ul>
  );
};
