import api from "./api";

const getEvento = async () => {
  try {
    const response = await api.get("/api/search");
    return response.data;
  } catch (error) {
    console.error(
      "Errore nel recupero di tutti gli eventi:",
      error.response?.data || error.message
    );
    throw error;
  }
};

const getEventoById = async (id) => {
  try {
    const response = await api.get("/api/eventi/${id}:");

    return response.data;
  } catch (error) {
    console.error(
      `Errore nel recupero dell'evento con ID ${id}:`,
      error.response?.data || error.message
    );
    throw error;
  }
};

const createEvento = async (eventoData) => {
  try {
    const response = await api.post("/api/eventi", eventoData);
    return response.data;
  } catch (error) {
    console.error(
      "Errore nella creazione dell'evento:",
      error.response?.data || error.message
    );
    throw error;
  }
};

const upDateEvento = async (id, eventoData) => {
  try {
    const response = await api.put(`/api/eventi/${id}`, eventData);
    return response.data;
  } catch (error) {
    console.error(
      `Errore nell'aggiornamento dell'evento con ID ${id}:`,
      error.response?.data || error.message
    );
    throw error;
  }
};

const deleteEvento = async (id) => {
  try {
    const response = await api.delete(`/api/eventi/${id}`);
    return reponse.data;
  } catch (error) {
    console.error(
      `Errore nell'eliminazione dell'evento con ID ${id}:`,
      error.reponse?.data || error.message
    );
    throw error;
  }
};

const eventiService = {
  getEvento,
  getEventoById,
  createEvento,
  upDateEvento,
  deleteEvento,
};

export default eventiService;
