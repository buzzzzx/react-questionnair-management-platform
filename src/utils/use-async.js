import { useCallback, useReducer, useState } from "react";
import { useMountedRef } from "./index";

const defaultInitialState = {
  stat: "idle",
  data: null,
  error: null,
};

const defaultConfig = {
  throwOnError: false,
};

export const useAsync = (initialState = {}, initialConfig = {}) => {
  const config = {
    ...defaultConfig,
    ...initialConfig,
  };

  const [state, dispatch] = useReducer(
    (state, action) => ({ ...state, ...action }),
    {
      ...defaultInitialState,
      ...initialState,
    }
  );

  const [retry, setRetry] = useState(() => () => {});
  const safeDispatch = useSafeDispatch(dispatch);

  const setData = useCallback(
    (data) =>
      safeDispatch({
        stat: "success",
        data: data,
        error: null,
      }),
    [safeDispatch]
  );

  const setError = useCallback(
    (error) =>
      safeDispatch({
        stat: "error",
        data: null,
        error: error,
      }),
    [safeDispatch]
  );

  const run = useCallback(
    (promise, runConfig) => {
      if (!promise || !promise.then) {
        throw new Error("请传入 Promise 类型数据");
      }

      setRetry(() => () => {
        if (runConfig?.retry) {
          run(runConfig?.retry(), runConfig);
        }
      });

      safeDispatch({ stat: "loading" });

      return promise
        .then((data) => {
          setData(data);
          return data;
        })
        .catch((error) => {
          setError(error);
          if (config.throwOnError) {
            console.log("run test");
            return Promise.reject(error);
          }
          return error;
        });
    },
    [config.throwOnError, safeDispatch, setData, setError]
  );

  return {
    isIdle: state.stat === "idle",
    isLoading: state.stat === "loading",
    isSuccess: state.stat === "success",
    isError: state.stat === "error",
    run,
    retry,
    setData,
    setError,
    ...state,
  };
};

const useSafeDispatch = (dispatch) => {
  const mountedRef = useMountedRef();
  return useCallback(
    (action) => (mountedRef.current ? dispatch(action) : void 0),
    [mountedRef, dispatch]
  );
};
