import { Route, Routes } from "react-router-dom";
import Homepage from "../components/Homepage";
import RegistrazionePage from "../page/RegistrazionePage";
import AdminRegistrazionePage from "../page/AdminRegistrazionePage";
import CategoriaAdminPage from "../page/CategorieAdminPage";
import LoginPage from "../page/LoginPage";
import ProtectedRoute from "../components/ProtectedRoute";
import SearchPage from "../page/SearchPage";
import AddEventiPage from "../page/AddEventiPage";
import MyEventiPage from "../page/MyEventiPage";
import EditEventiPage from "../page/EditEventiPage";
import ProfiloPage from "../page/ProfiloPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/register" element={<RegistrazionePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/search"
        element={
          <ProtectedRoute>
            <SearchPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/my-eventi"
        element={
          <ProtectedRoute>
            <MyEventiPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/register"
        element={
          <ProtectedRoute isAdmin={true}>
            <AdminRegistrazionePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/categoria"
        element={
          <ProtectedRoute isAdmin={true}>
            <CategoriaAdminPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/eventi/add"
        element={
          <ProtectedRoute>
            <AddEventiPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/eventi/edit/:id"
        element={
          <ProtectedRoute>
            <EditEventiPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profilo"
        element={
          <ProtectedRoute>
            <ProfiloPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
