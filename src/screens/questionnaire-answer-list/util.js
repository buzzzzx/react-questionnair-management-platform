import { useUrlQueryParam } from "../../utils/url";
import { useMemo } from "react";

export const useAnswersSearchParam = () => {
  const [params, setParams] = useUrlQueryParam(["pin"]);
  return [useMemo(() => params, [params]), setParams];
};

export const useAnswersQueryKey = (id) => {
  const [searchParam] = useAnswersSearchParam();
  return ["answers", { ...searchParam, id }];
};
