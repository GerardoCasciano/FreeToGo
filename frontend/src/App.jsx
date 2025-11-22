import "./App.css";

import NavBar from "./components/NavBar";
import AppRoutes from "./rooutes/AppRoutes";

import AuthProvider from "./components/Authprovider";

function App() {
  return (
    <AuthProvider>
      <NavBar />
      <main>
        <AppRoutes />
      </main>
    </AuthProvider>
  );
}

export default App;
