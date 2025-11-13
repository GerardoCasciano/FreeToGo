import "./App.css";

import NavBar from "./components/NavBar";

import { Routes, Route } from "react-router-dom";
import CategoryAdminPage from "./page/CategorieAdminPage";

//Componento per Homepage
const Homepage = () => (
  <div className="container mt-4">
    <h1>Benvenuto in FreeToGo!</h1>

  </div>
);

function App() {
  return (
    <>
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<Homepage></Homepage>} />
          <Route path="/admin/categoria" element={CategoryAdminPage} />
        </Routes>
      </main>
    </>
  );
}

export default App;
