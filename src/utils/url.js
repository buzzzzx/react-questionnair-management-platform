import { cleanObject, subset } from "./index";
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

export const useUrlQueryParam = (keys) => {
  const [searchParams] = useSearchParams();
  const setSearchParams = useSetUrlQueryParams();

  return [
    useMemo(
      () => subset(Object.fromEntries(searchParams), keys),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [searchParams]
    ),
    (params) => setSearchParams(params),
  ];
};

export const useSetUrlQueryParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  return (params) => {
    let o = cleanObject({
      ...Object.fromEntries(searchParams),
      ...params,
    });

    // TODO /questionnaires?
    return setSearchParams(o);
  };
};
