import api from "./api";

const getAllTipiEvento = async () => {
  try {
    const response = await api.get("/api/tipievento");
    return response.data;
  } catch (error) {
    console.error(
      "Errore nel recupero dei tipi di evento:",
      error.response?.data || error.message
    );
    throw error;
  }
};

const tipoDiEventoService = {
  getAllTipiEvento,
};

export default tipoDiEventoService;
