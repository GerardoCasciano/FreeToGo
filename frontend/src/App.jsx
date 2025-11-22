import "./App.css";

import NavBar from "./components/NavBar";
import AppRoutes from "./rooutes/AppRoutes";

import AuthProvider from "./components/Authprovider";
import Footer from "./components/Footer";

function App() {
  return (
    <AuthProvider>
      <NavBar />
      <main>
        <AppRoutes />
      </main>
      <Footer />
    </AuthProvider>
  );
}

export default App;
