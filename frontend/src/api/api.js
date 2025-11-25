import axios from "axios";

//creo istanza axios con url di base per il backend

const api = axios.create({
  baseURL: "http://localhost:3008",
});
//Aggiungo interceptor per le richieste
//Controlla se abbiamo un token di atuenticazione nel localstorage
// Se affermativo  si aggiunge alla'header della richiesta . Così il backend saprà che siamo autenitcati.
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    console.log("Interceptor: Invio del token", token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default api;
