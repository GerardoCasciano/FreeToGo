import { Route, Routes } from "react-router-dom";
import Homepage from "../components/Homepage";
import ResgistrazionePage from "../page/RegistrazionePage";
import AdminRegistrazionePage from "../page/AdminRegistrazionePage";
import CategoriaAdminPage from "../page/CategorieAdminPage";
import LoginPage from "../page/LoginPage";
import ProtectedRooute from "../components/ProtectedRoute";
import SearchPage from "../page/SearchPage";
import AddEventiPage from "../page/AddEventiPage";
import MyEventiPage from "../page/MyEventiPage";
import EditEventiPage from "../page/EditEventiPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/register" element={<ResgistrazionePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/search"
        element={
          <ProtectedRooute>
            <SearchPage />
          </ProtectedRooute>
        }
      />
      <Route
        path="/eventi/add"
        element={
          <ProtectedRooute>
            <AddEventiPage />
          </ProtectedRooute>
        }
      />
      <Route
        path="/my-eventi"
        element={
          <ProtectedRooute>
            <MyEventiPage />
          </ProtectedRooute>
        }
      />
      <Route
        path="/eventi/edit/:id"
        element={
          <ProtectedRooute>
            <EditEventiPage />
          </ProtectedRooute>
        }
      />
      <Route path="/admin/register" element={<AdminRegistrazionePage />} />
      <Route path="/admin/categorie" element={<CategoriaAdminPage />} />
    </Routes>
  );
};
export default AppRoutes;
