import { useUrlQueryParam } from "../../utils/url";
import { useMemo } from "react";

export const useQuestionnairesSearchParam = () => {
  const [params, setParams] = useUrlQueryParam(["name", "status"]);
  return [useMemo(() => params, [params]), setParams];
};

export const useQuestionnairesQueryKey = () => {
  const [searchParam] = useQuestionnairesSearchParam();
  return ["questionnaires", searchParam];
};
