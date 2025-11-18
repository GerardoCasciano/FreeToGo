
import api from "./api";

const CATEGORIA_API_URL = "/api/categoria";

const categoriaService = {
  getAllCategorie: async () => {
    try {
      const response = await api.get(CATEGORIA_API_URL);
      return response.data;
    } catch (error) {
      console.error("Errore Fetch categorie :", error);
      throw error;
    }
  },

  //POST
  createCategoria: async (categorisData) => {
    try {
      const response = await api.post(CATEGORIA_API_URL, categorisData);
      return response.data;
    } catch (error) {
      console.error("Errore CREAZIONE categoria :", error);
    }
  },
  //GET ID
  getCategoriaById: async (id) => {
    try {
      const response = await api.get(`${CATEGORIA_API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Errore Fetch categoria con Id `, error);
      throw error;
    }
  },

  //Aggiorno per Id Put
  updateCategoria: async (id, categoriaData) => {
    try {
      const response = await api.put(
        `${CATEGORIA_API_URL}/${id}`,
        categoriaData
      );
      return response.data;
    } catch (error) {
      console.error(`Error updating category with ID ${id}:`, error);
      throw error;
    }
  },
  //Elimino
  deleteCategoria: async (id) => {
    try {
      const response = await api.delete(`${CATEGORIA_API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(
        `Errore ELIMINAZIONE delle categoria con  Id ${id}:`,
        error
      );
      throw error;
    }
  },
};

export default categoriaService;
