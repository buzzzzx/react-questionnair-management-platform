import { useLocation } from "react-router-dom";
import {
  useAddQuestionnaire,
  useEditQuestionnaire,
  useQuestionnaire,
} from "../../utils/questionnaire";
import { useQuestionnairesQueryKey } from "../questionnair-list/util";

export const Questionnaire = () => {
  const location = useLocation();
  const arr = location.pathname.split("/");
  const id =
    arr[arr.length - 2] === "questionnaires"
      ? false
      : Number(arr[arr.length - 2]);

  // console.log("id", id);

  // useQuestionnaire
  const { data: editingQuestionnaire, isLoading } = useQuestionnaire(id);

  // 编辑 / 添加 hook
  const useMutateQuestionnaire = editingQuestionnaire
    ? useEditQuestionnaire
    : useAddQuestionnaire;
  const {
    mutateAsync,
    error,
    isLoading: mutateLoading,
  } = useMutateQuestionnaire(useQuestionnairesQueryKey());

  // form
  // title
  // TODO
  const onFinish = () => {
    // mutateAsync(param);
  };

  return <h1>创建问卷</h1>;
};
