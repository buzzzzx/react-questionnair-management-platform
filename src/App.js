import "./App.css";
import { useState } from "react";
import { AuthenticatedApp } from "./screens/authenticated-app";
import { UnauthenticatedApp } from "./screens/unauthenticated-app";
import { Button } from "antd";
import { useAuth } from "./context/auth-context";

function App() {
  // TODO 路由
  const { user } = useAuth();
  return <div>{user ? <AuthenticatedApp /> : <UnauthenticatedApp />}</div>;
}

export default App;
