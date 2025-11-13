import { ssrDynamicImportKey } from "vite/module-runner";
import api from "./api";

const UTENTE_API_URL = "/api/utenti";

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
      const response = await api.get("${UTENTE_API_URL}/${utenteId}");
      return response.data;
    } catch (error) {
      console.error(`Errore Fetch per untente con Id ${utenteId}:`, error);
      throw error;
    }
  },

  updateUtente: async (utenteId, utenteData) => {
    try {
      const response = await api.put(
        "${UTENTE_API_URL}/${utenteId}",
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
      const reponse = await api.delete("${UTENTE_API_URL}/${utenteId}");
      return response.data;
    } catch (error) {
      console.error(`Errore ELEMINIZAIONE utente con Id ${utenteId}:`, error);
      throw error;
    }
  },
};

export default utenteService;
