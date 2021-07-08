import { useHttp } from "./http";
import { useQuery, useMutation } from "react-query";
import { cleanObject } from "./index";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./use-optimistic-udpate";

export const useQuestionnaires = (params = {}) => {
  const client = useHttp();

  return useQuery(["questionnaires", params], () =>
    client("questionnaires", {
      data: cleanObject(params),
    })
  );
};

export const useEditReleaseQuestionnaire = (queryKey) => {
  const client = useHttp();

  return useMutation(
    (param) =>
      client(`questionnaires/${param.id}`, {
        data: param,
        method: "PATCH",
      }),
    useEditConfig(queryKey)
  );
};

export const useEditQuestionnaire = (queryKey) => {
  const client = useHttp();

  return useMutation(
    (param) =>
      client(`questionnaires/${param.id}`, {
        data: param,
        method: "PATCH",
      }),
    useEditConfig(queryKey)
  );
};

export const useAddQuestionnaire = (queryKey) => {
  const client = useHttp();

  return useMutation(
    (param) =>
      client("questionnaires", {
        data: param,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useDeleteQuestionnaire = (queryKey) => {
  const client = useHttp();
  return useMutation(
    ({ id }) =>
      client(`questionnaires/${id}`, {
        method: "DELETE",
      }),
    useDeleteConfig(queryKey)
  );
};

export const useDeleteQuestionnaires = (queryKey) => {
  const client = useHttp();
  return useMutation(
    (params) =>
      client(`questionnaires/`, {
        data: params,
        method: "DELETE",
      }),
    useDeleteConfig(queryKey)
  );
};

export const useQuestionnaire = (id) => {
  const client = useHttp();

  return useQuery(
    ["questionnaire", { id }],
    () =>
      client(`questionnaires/${id}/view`, {
        method: "GET",
      }),
    {
      enabled: !!id,
    }
  );
};
