import "./App.css";
import { AuthenticatedApp } from "./screens/authenticated-app";
import { UnauthenticatedApp } from "./screens/unauthenticated-app";
import { useAuth } from "./context/auth-context";

function App() {
  const { user } = useAuth();
  return <div>{user ? <AuthenticatedApp /> : <UnauthenticatedApp />}</div>;
}

export default App;
