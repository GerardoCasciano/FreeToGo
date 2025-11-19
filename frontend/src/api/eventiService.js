import api from "./api";

const getAllEventi = async () => {
  try {
    const response = await api.get("/api/eventi");
    return response.data;
  } catch (error) {
    console.error(
      "Errore nel recupero degli eventi:",
      error.response?.data || error.message
    );
    throw error;
  }
};

const getMyEventi = async () => {
  try {
    const response = await api.get("/api/eventi/me");
    return response.data;
  } catch (error) {
    console.error(
      "Errore nel recupero dei eveneti:",
      error.response?.data || error.message
    );
    throw error;
  }
};

const getEventoById = async (id) => {
  try {
    const response = await api.get(`/api/eventi/${id}`);
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

const updateEvento = async (id, eventoData) => {
  try {
    const response = await api.put(`/api/eventi/${id}`, eventoData);
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
    return response.data;
  } catch (error) {
    console.error(
      `Errore nell'eliminazione dell'evento con ID ${id}:`,
      error.response?.data || error.message
    );
    throw error;
  }
};

const getAllCategorie = async () => {
  try {
    const response = await api.get("/api/categoria");
    return response.data;
  } catch (error) {
    console.error(
      "Errore durante il recupero delle categorie:",
      error.response?.data || error.message
    );
    throw error;
  }
};

const getTipiEventoByCategoria = async (categoriaId) => {
  try {
    const response = await api.get(`/api/tipievento/categoria/${categoriaId}`);
    return response.data;
  } catch (error) {
    console.error(
      `Errore nel recupero dei tipi di evento per categoria ${categoriaId}:`,
      error.response?.data || error.message
    );
    throw error;
  }
};

// Oggetto service che include tutte le funzioni
const eventiService = {
  getAllEventi,
  getEventoById,
  createEvento,
  updateEvento,
  deleteEvento,
  getAllCategorie,
  getTipiEventoByCategoria,
  getMyEventi,
};

// Esportazione unica di default
export default eventiService;
