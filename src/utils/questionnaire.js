import { http, useHttp } from "./http";
import { useQuery, useMutation } from "react-query";
import { cleanObject } from "./index";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./use-optimistic-udpate";

export const useQuestionnaires = (params = {}) => {
  const intervalMs = 1000;
  const client = useHttp();

  return useQuery(
    ["questionnaires", params],
    () =>
      client("questionnaires", {
        data: cleanObject(params),
      }),
    {
      // Refetch the data every intervalMs
      // https://react-query.tanstack.com/examples/auto-refetching
      // refetchInterval: intervalMs,
    }
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
      client("questionnaires/create", {
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

/**
 * 获得问卷的统计分析信息
 * @param id
 * @return {UseQueryResult<unknown, unknown>}
 */
export const useAnalysisQuestionnaire = (id) => {
  const client = useHttp();

  return useQuery(
    ["questionnaire", { id }],
    () =>
      client(`questionnaires/${id}/analysis`, {
        method: "GET",
      }),
    {
      enabled: !!id,
    }
  );
};

/**
 * 请求填写问卷的问卷信息，不需要做鉴权
 * @param openId
 * @return {UseQueryResult<unknown, unknown>}
 */
export const useFillQuestionnaire = (openId) => {
  const client = http;

  return useQuery(
    ["questionnaire", { openId }],
    () =>
      client(`questionnaires/${openId}/write`, {
        method: "GET",
      }),
    {
      enabled: !!openId,
    }
  );
};
