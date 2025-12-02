FreeToGo - Piattaforma di Scoperta Eventi

FreeToGo è un'applicazione web full-stack che permette agli utenti di scoprire, creare e gestire eventi. La piattaforma integra una ricerca eventi basata su API esterne e una mappa interattiva per visualizzare la posizione degli eventi.

Indice

- Tecnologie Utilizzate
  - Backend
  - Frontend
- Funzionalità Principali
- Prerequisiti
- Installazione e Avvio
  - Backend (Spring Boot)
  - Frontend (React)
- Struttura del Progetto

---

Tecnologie Utilizzate

Backend
- Linguaggio: Java 21
- Framework: Spring Boot 3.5.7
- Database: PostgreSQL con estensione Pgvector
- Sicurezza: Spring Security, JSON Web Token (JWT) per l'autenticazione stateless.
- Accesso ai Dati: Spring Data JPA
- API Esterne:
  - Cloudinary: Per l'hosting e la gestione delle immagini degli eventi.
  - SerpApi: Per la ricerca di eventi tramite l'infrastruttura di Google Search.
- Utilità:
  - Lombok: Per ridurre il codice boilerplate.
  - Maven: Come build tool e per la gestione delle dipendenze.

Frontend
- Linguaggio: JavaScript (ES6+)
- Framework: React 19
- Build Tool: Vite
- UI Framework: React Bootstrap e Bootstrap 5
- Routing: React Router DOM
- Mappe Interattive: Leaflet e React Leaflet
- Chiamate HTTP: Axios
- Utilità:
  - Moment.js: Per la manipolazione e formattazione delle date.
  - ESLint: Per il code linting.

---

Funzionalità Principali

- Autenticazione Utente: Registrazione e Login sicuri con gestione delle sessioni tramite token JWT.
- Gestione Eventi (CRUD): Gli utenti autenticati possono creare, modificare e cancellare i propri eventi.
- Creazione Evento con Mappa: Un form intuitivo permette di inserire i dettagli dell'evento e di selezionare la posizione precisa cliccando su una mappa interattiva (geocodifica e geocodifica inversa tramite Nominatim/OpenStreetMap).
- I Miei Eventi: Una pagina dedicata dove ogni utente può vedere la lista dei propri eventi e la loro posizione su una mappa.
- Ricerca Esterna: Funzionalità di ricerca che si appoggia a SerpApi per trovare eventi nel mondo reale, fornendo link e un riassunto dei risultati.
- Upload Immagini: Integrazione con Cloudinary per caricare un'immagine di copertina per ogni evento.

---

Prerequisiti

Assicurati di avere installato i seguenti software:
- Java Development Kit (JDK): Versione 21 o superiore.
- Maven: Versione 3.8 o superiore.
- Node.js: Versione 18 o superiore, con npm.
- PostgreSQL: Un'istanza di PostgreSQL in esecuzione.

---

Installazione e Avvio

Backend (Spring Boot)

1.  Clonare il repository:
    git clone <URL_DEL_TUO_REPOSITORY>
    cd <NOME_CARTELLA_PROGETTO>

2.  Configurare il Backend:
    - Naviga nella cartella src/main/resources.
    - Rinomina (se necessario) o modifica il file application.properties.
    - Inserisci le credenziali corrette per il tuo database PostgreSQL e le chiavi API per Cloudinary e SerpApi.
    # Esempio di configurazione
    spring.datasource.url=jdbc:postgresql://localhost:5432/tuo_db
    spring.datasource.username=tuo_username
    spring.datasource.password=tua_password

    cloudinary.cloud_name=tuo_cloud_name
    cloudinary.api_key=tua_api_key
    cloudinary.api_secret=tua_api_secret

    serpapi.apikey=tua_chiave_serpapi
    serpapi.baseurl=https://serpapi.com/search

3.  Avviare il Backend:
    - Dalla root del progetto, esegui il seguente comando Maven:
    ./mvnw spring-boot:run
    - Il server backend sarà in esecuzione su http://localhost:3008.

Frontend (React)

1.  Navigare nella cartella del frontend:
    cd frontend

2.  Installare le dipendenze:
    npm install

3.  Configurare l'URL del Backend:
    - Apri il file frontend/src/api/api.js.
    - Assicurati che il baseURL corrisponda all'indirizzo del tuo backend.
    const api = axios.create({
      baseURL: "http://localhost:3008", // Modifica se necessario
    });

4.  Avviare il Frontend:
    npm run dev
    - L'applicazione React sarà accessibile su http://localhost:5173 (o un'altra porta indicata da Vite).

---

