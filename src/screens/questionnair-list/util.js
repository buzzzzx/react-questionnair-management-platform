import { useUrlQuerySearchParam } from "../../utils/url";
import { useMemo } from "react";

export const useQuestionnairesSearchParam = () => {
  const [params, setParams] = useUrlQuerySearchParam(["name"]);
  return [useMemo(() => params, [params]), setParams];
};
