import api from "./api";

const login = async (Credential) => {
  try {
    const response = await api.post("/api/auth/login", Credential);
    if (response.data && response.data.token) {
      localStorage.setItem("token", response.data.token);
    }
    return response.data;
  } catch (error) {
    console.error("Login fallito:", error.respomse?.data || error.message);
    throw error;
  }
};

//invia dati nuovo utente per la registrazione
const register = async (userData) => {
  try {
    const respomse = await api.post("/api/auth/register", userData);
    return respomse.data;
  } catch (error) {
    console.error(
      "Registrazone fallita:",
      error.respomse?.data || error.message
    );
    throw error;
  }
};
//Stessa cosa per Admin
const registerAdmin = async (adminData) => {
  try {
    const respomse = await api.post("/api/auth/register/admin", adminData);
    return register.data;
  } catch (error) {
    console.error(
      "Registrazone Admin fallita:",
      error.register?.data || error.message
    );
    throw error;
  }
};
//Recupera dati dell'utente  autenticato

const getMe = async () => {
  try {
    const respomse = await api.get("/api/auth/me");
    return respomse.data;
  } catch (error) {
    console.error(
      "Errore recupero dei dati utente.",
      error.respomse?.data || error.message
    );
    throw error;
  }
};
//Eseguo logout untente
const logout = () => {
  localStorage.removeItem("token");
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
