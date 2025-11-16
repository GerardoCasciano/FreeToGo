import { Route, Routes } from "react-router-dom";
import Homepage from "../components/Homepage";
import ResgistrazionePage from "../page/RegistrazionePage";
import AdminRegistrazionePage from "../page/AdminRegistrazionePage";
import CategoriaAdminPage from "../page/CategorieAdminPage";
import LoginPage from "../page/LoginPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/register" element={<ResgistrazionePage />} />
      <Route path="/admin/register" element={<AdminRegistrazionePage />} />
      <Route path="/login" element={<LoginPage />} />

      <Route path="/admin/categorie" element={<CategoriaAdminPage />} />
    </Routes>
  );
};
export default AppRoutes;
