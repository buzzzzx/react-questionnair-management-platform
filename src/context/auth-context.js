import React, { useContext } from "react";
import * as auth from "../auth-provider";
import { getToken } from "../auth-provider";
import { http } from "../utils/http";
import { useMount } from "../utils";
import { useAsync } from "../utils/use-async";
// import { FullPageErrorFallback, FullPageLoading } from "../components/lib";
import { useQueryClient } from "react-query";
import { FullPageErrorFallback, FullPageLoading } from "../components/lib";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const login = (form) =>
    auth.login(form).then((user) => {
      setUser(user);
      navigate("/questionnaires");
    });
  const register = (form) =>
    auth.register(form).then((user) => {
      setUser(user);
      navigate("/questionnaires");
    });
  const logout = () =>
    auth.logout().then(() => {
      setUser(null);
      queryClient.clear();
      navigate("/login");
    });

  useMount(() => {
    run(bootstrapUser()).then((user) => {
      if (user == null) {
        navigate("/login");
      }
    });
  });

  if (isLoading || isIdle) {
    return <FullPageLoading />;
  }
  if (isError) {
    return <FullPageErrorFallback error={error} />;
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
