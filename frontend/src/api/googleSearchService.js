import api from "./api";

export const searchEventi = async (query) => {
  try {
    const response = await api.get(`/api/google/search`, {
      params: {
        prompt: query,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Errore durante la ricerca degli eventi:",
      error.response?.data || error.message
    );
    throw error;
  }
};
export default searchEventi;
