import { useHttp } from "./http";
import { useQuery } from "react-query";
import { cleanObject } from "./index";

export const useQuestionnaires = (params = {}) => {
  const client = useHttp();

  return useQuery(["questionnaires", params], () =>
    client("questionnaires", {
      data: cleanObject(params),
    })
  );
};
