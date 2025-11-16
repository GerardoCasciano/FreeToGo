import "./App.css";

import NavBar from "./components/NavBar";
import AppRoutes from "./rooutes/AppRoutes";

import Homepage from "./components/Homepage";
import InfoCards from "./components/InfoCards";
import CategoriaAdminPage from "./page/CategorieAdminPage";
import AdminRegistrazionePage from "./page/AdminRegistrazionePage";
import LoginPage from "./page/LoginPage";
import ResgistrazionePage from "./page/RegistrazionePage";
function App() {
  return (
    <>
      <NavBar />
      <main className="container">
        <AppRoutes />
      </main>
    </>
  );
}

export default App;
