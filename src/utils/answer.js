import { useHttp } from "./http";
import { useMutation, useQuery } from "react-query";
import {
  useDeleteConfig,
  useEditAnswerConfig,
  useEditConfig,
} from "./use-optimistic-udpate";
import { cleanObject } from "./index";

export const useAnswers = (id, param) => {
  const client = useHttp();

  return useQuery(["answers", { ...param, id: Number(id) }], () =>
    client(`questionnaires/${id}/answers`, {
      method: "GET",
      data: cleanObject(param || {}),
    })
  );
};

export const useDeleteAnswer = (queryKey) => {
  const client = useHttp();
  return useMutation(
    (id) =>
      client(`answers/${id}`, {
        method: "DELETE",
      }),
    useDeleteConfig(queryKey)
  );
};

export const useDeleteAnswers = (queryKey) => {
  const client = useHttp();
  return useMutation(
    (params) =>
      client(`answers/`, {
        data: params,
        method: "DELETE",
      }),
    useDeleteConfig(queryKey)
  );
};

export const usePinAnswer = (queryKey) => {
  const client = useHttp();

  return useMutation(
    (param) =>
      client(`answers/${param.answerId}`, {
        data: param,
        method: "PATCH",
      }),
    useEditAnswerConfig(queryKey)
  );
};

export const useAnswer = (id) => {
  const client = useHttp();

  return useQuery(["answer", { id }], () =>
    client(`answers/${id}`, {
      method: "GET",
    })
  );
};
