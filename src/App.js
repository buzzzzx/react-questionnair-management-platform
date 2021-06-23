import "./App.css";
import { useState } from "react";
import { AuthenticatedApp } from "./screens/authenticated-app";
import { UnauthenticatedApp } from "./screens/unauthenticated-app";
import { Button } from "antd";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <div>
      <Button onClick={() => setIsAuthenticated(!isAuthenticated)}>切换</Button>
      {isAuthenticated ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </div>
  );
}

export default App;
