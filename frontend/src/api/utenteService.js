import api from "./api";

const UTENTE_API_URL = "/api/utenti";

const uploadAvatar = async (userId, file) => {
  const formData = new FormData();
  formData.append("avatar", file);

  try {
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    const response = await api.post(
      `${UTENTE_API_URL}/${userId}/avatar`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
=======
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
    const response = await api.post(`/api/utenti/${userId}/avatar`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
>>>>>>> Stashed changes
    return response.data;
  } catch (error) {
    console.error(
      `Errore durante l'upload dell'immagine ${userId}:`,
      error.response?.data || error.message
    );
    throw error;
  }
};

const utenteService = {
  getAllUtenti: async () => {
    try {
      //GETMAPPING
      const response = await api.get(UTENTE_API_URL);
      return response.data;
    } catch (error) {
      console.error("Errore nella fethcing utenti", error);
      throw error;
    }
  },
  getUtentiById: async (utenteId) => {
    try {
      const response = await api.get(`${UTENTE_API_URL}/${utenteId}`);
      return response.data;
    } catch (error) {
      console.error(`Errore Fetch per untente con Id ${utenteId}:`, error);
      throw error;
    }
  },

  updateUtente: async (utenteId, utenteData) => {
    try {
      const response = await api.put(
        `${UTENTE_API_URL}/${utenteId}`,
        utenteData
      );
      return response.data;
    } catch (error) {
      console.error(
        `Errore AGGIORNAMENTO per utente con  Id ${utenteId}:`,
        error
      );
      throw error;
    }
  },
  deleteUtente: async (utenteId) => {
    try {
      const response = await api.delete(`${UTENTE_API_URL}/${utenteId}`);
      return response.data;
    } catch (error) {
      console.error(`Errore ELEMINIZAIONE utente con Id ${utenteId}:`, error);
      throw error;
    }
  },

  uploadAvatar,
};

export default utenteService;
