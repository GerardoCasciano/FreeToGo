import api from "./api";

export const login = async (credentials) => {
  try {
    const response = await api.post("/api/auth/login", credentials);
    if (response.data && response.data.accessToken) {
      // Salva il token direttamente qui, come facevi prima
      localStorage.setItem("token", response.data.accessToken);
      // Ritorna l'intero oggetto data dal backend, inclusi token e dati utente
      return response.data;
    }
    // Se non c'è accessToken, potremmo voler lanciare un errore o gestire diversamente
    throw new Error("Login fallito: Nessun token di accesso ricevuto.");
  } catch (error) {
    console.error("Login fallito:", error.response?.data || error.message);
    throw error;
  }
};

//invia dati nuovo utente per la registrazione
export const register = async (userData) => {
  try {
    const response = await api.post("/api/auth/register", userData);
    return response.data;
  } catch (error) {
    console.error(
      "Registrazone fallita:",
      error.respomse?.data || error.message
    );
    throw error;
  }
};
//Stessa cosa per Admin
export const registerAdmin = async (adminData) => {
  try {
    const response = await api.post("/api/auth/register/admin", adminData);
    return response.data;
  } catch (error) {
    console.error(
      "Registrazone Admin fallita:",
      error.register?.data || error.message
    );
    throw error;
  }
};
//Recupera dati dell'utente  autenticato

export const getMe = async () => {
  try {
    const response = await api.get("/api/auth/me");
    return response.data;
  } catch (error) {
    console.error(
      "Errore recupero dei dati utente.",
      error.respomse?.data || error.message
    );
    throw error;
  }
};
//Eseguo logout untente
export const logout = () => {
  localStorage.removeItem("token");
  delete api.defaults.headers.common["Authorization"];
};
//Controlliamo se utente è loggato
export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return !!token;
};

//Espostiamo  le funzioni create in unico oggetto

const authService = {
  login,
  register,
  registerAdmin,
  getMe,
  logout,
};

export default authService;
