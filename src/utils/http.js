import * as qs from "qs";
import * as auth from "../auth-provider";
import { useAuth } from "../context/auth-context";
import { useCallback } from "react";

// const apiUrl = process.env.REACT_APP_API_URL;
const apiUrl = "http://121.36.47.113:3000";

export const http = (
  endpoint,
  { data, token, headers, ...customConfig } = {}
) => {
  const config = {
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? "application/json" : "",
    },
    ...customConfig,
  };

  if (config.method.toUpperCase() === "GET") {
    endpoint += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }

  // axios 和 fetch 的行为不同：axios 可以在返回状态不为 2xx 时返回异常，fetch 不会返回异常
  return window
    .fetch(`${apiUrl}/${endpoint}`, config)
    .then(async (response) => {
      if (response.status === 401) {
        await auth.logout();
        window.location.reload();
        return Promise.reject({ message: "请重新登录" });
      }

      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
    });
};

export const useHttp = () => {
  const { user } = useAuth();

  return useCallback(
    (endpoint, config) => http(endpoint, { ...config, token: user?.token }),
    [user?.token]
  );
};
