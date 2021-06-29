import React, { useContext } from "react";
import * as auth from "../auth-provider";
import { getToken } from "../auth-provider";
import { http } from "../utils/http";
import { useMount } from "../utils";
import { useAsync } from "../utils/use-async";
// import { FullPageErrorFallback, FullPageLoading } from "../components/lib";
import { useQueryClient } from "react-query";

const bootstrapUser = async () => {
  let user = null;
  const token = getToken();
  if (token) {
    const data = await http("me", { token });
    user = data.user;
  }
  return user;
};

const AuthContext = React.createContext({
  user: null,
  login: () => {},
  register: () => {},
  logout: () => {},
});
AuthContext.displayName = "AuthContext";

export const AuthProvider = ({ children }) => {
  const {
    run,
    data: user,
    setData: setUser,
    isLoading,
    isError,
    error,
    isIdle,
  } = useAsync();

  const queryClient = useQueryClient();

  const login = (form) => auth.login(form).then(setUser);
  const register = (form) => auth.register(form).then(setUser);
  const logout = () =>
    auth.logout().then(() => {
      setUser(null);
      queryClient.clear();
    });

  useMount(() => {
    run(bootstrapUser());
  });

  // TODO FullPageLoading
  if (isLoading || isIdle) {
    return <div>Loading</div>;
  }
  // TODO FullPageError
  if (isError) {
    return <div>Error</div>;
  }

  return (
    <AuthContext.Provider
      children={children}
      value={{ user, login, register, logout }}
    />
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("请在 AuthProvider 中使用 context");
  }
  return context;
};
