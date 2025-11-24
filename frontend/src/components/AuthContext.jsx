<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
import { useContext, createContext } from "react";

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(
      "useAuth deve essere utilizzato all'ineterno di AuthProvider"
    );
=======
import { createContext, useContext, useEffect, useState } from "react";

=======
import { createContext, useContext, useEffect, useState } from "react";

>>>>>>> Stashed changes
=======
import { createContext, useContext, useEffect, useState } from "react";

>>>>>>> Stashed changes
// 1. Componente Context
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = () => {
      const token = localStorage.getItem("token");
      const userDataString = localStorage.getItem("user");

      if (token && userDataString) {
        try {
          const userData = JSON.parse(userDataString);

          setUser(userData);
          setAuthenticated(true);
        } catch (error) {
          console.error(
            "Errore nel parsing dei dati utente da localStorage:",
            error
          );
          // Pulisce in caso di dati corrotti
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }
      } else {
        setAuthenticated(false);
        setUser(null);
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  const login = (authData) => {
    if (authData && authData.accessToken) {
      // authData deve contenere tutti i dati utente + token
      localStorage.setItem("token", authData.accessToken);
      localStorage.setItem("user", JSON.stringify(authData));

      setUser(authData);
      setAuthenticated(true);
    } else {
      console.error(
        "Login fallito: i dati di autenticazione non contengono il token."
      );
      setAuthenticated(false);
      setUser(null);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setAuthenticated(false);
  };

  const updatedUser = (newUserData) => {
    if (newUserData) {
      const currentAuthDataString = localStorage.getItem("user");

      if (!currentAuthDataString) return;

      const currentAuthData = JSON.parse(currentAuthDataString);

      const updatedFullUserData = { ...currentAuthData, ...newUserData };

      localStorage.setItem("user", JSON.stringify(updatedFullUserData));
      setUser(updatedFullUserData);
    }
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout,

    updateUser: updatedUser,
  };

  if (loading) {
    return <div>Caricamento autenticazione...</div>;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve essere usato all'interno di AuthProvider");
<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
  }
  return context;
};

export default AuthContext;
