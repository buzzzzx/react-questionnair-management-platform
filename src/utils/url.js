import { cleanObject, subset } from "./index";
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

export const useUrlQuerySearchParam = (keys) => {
  const [searchParams] = useSearchParams();
  const setSearchParams = useSetUrlQueryParams();

  return [
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useMemo(() => subset(searchParams, keys), [searchParams]),
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
    return setSearchParams(o);
  };
};
