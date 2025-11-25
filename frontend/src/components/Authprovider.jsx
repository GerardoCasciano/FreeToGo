// src/context/AuthProvider.jsx

import React, { useEffect, useState } from "react";
import { isAuthenticated as checkAuthStatus } from "../api/authService";

import AuthContext from "./AuthContext";

// Componente provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const authenticatedResult = await checkAuthStatus();
        if (authenticatedResult) {
          const userDataString = localStorage.getItem("user");
          if (userDataString) {
            const userData = JSON.parse(userDataString);
            setUser(userData);
            setAuthenticated(true);
          } else {
            setAuthenticated(false);
          }
        } else {
          setAuthenticated(false);
        }
      } catch (error) {
        console.error("Errore verifica autenticazione:", error);
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    verifyAuth();
  }, []);

  const login = (userData, token) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token || userData.accessToken);
    setUser(userData);
    setAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setAuthenticated(false);
  };

  const updateUser = (newUserData) => {
    localStorage.setItem("user", JSON.stringify(newUserData));
    setUser(newUserData);
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
    updateUser,
  };

  if (loading) {
    return <div>Caricamento Autenticazione....</div>;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
