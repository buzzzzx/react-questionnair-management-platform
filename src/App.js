import "./App.css";
import { useState } from "react";
import { AuthenticatedApp } from "./screens/authenticated-app";
import { UnauthenticatedApp } from "./screens/unauthenticated-app";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <div>
      <button onClick={() => setIsAuthenticated(!isAuthenticated)}>切换</button>
      {isAuthenticated ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </div>
  );
}

export default App;
