import "./App.css";
import { useState } from "react";
import { AuthenticatedApp } from "./screens/authenticated-app";
import { UnauthenticatedApp } from "./screens/unauthenticated-app";
import { Button } from "antd";
// import { useAuth } from "./context/auth-context";

function App() {
  // const {user} = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <div>
      <Button onClick={() => setIsAuthenticated(!isAuthenticated)}>切换</Button>
      {isAuthenticated ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </div>
  );
}

export default App;
