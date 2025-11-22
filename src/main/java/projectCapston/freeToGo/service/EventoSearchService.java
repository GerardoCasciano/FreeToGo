package projectCapston.freeToGo.service;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import projectCapston.freeToGo.payload.GoogleDTO;

import java.io.IOException;
import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class EventoSearchService {
    //Lista categorie permesse per messaggio di validazione o errore
    private static final String CATEGORIE_PERMESSE = "eventi culturali, musica, concerti, sagre, musei, teatro, sport";

    @Value("${serpapi.baseurl}")
    private String baseUrl;
    @Value("${serpapi.apikey}")
    private String apiKey;
    private final HttpClient httpClient;
    private final ObjectMapper objectMapper;

    public EventoSearchService() {
        this.httpClient = HttpClient.newHttpClient();
        this.objectMapper = new ObjectMapper();
    }

    //Check del prompt dell'utente se è pertinente alle categorie evento disponibili.
    public boolean isPromptRelevant(String prompt) {
        String lowerPrompt = prompt.toLowerCase();

        //elenco categorie disponibili
        return lowerPrompt.contains("concerto") ||
                lowerPrompt.contains("musei") ||
                lowerPrompt.contains("teatro") ||
                lowerPrompt.contains("sagra") ||
                lowerPrompt.contains("sport") ||
                lowerPrompt.contains("mostra") ||
                lowerPrompt.contains("evento culturale") ||
                lowerPrompt.contains("arte") ||
                lowerPrompt.contains("partita");
    }

    //Eseguo la chiamata API per ricerca
    public GoogleDTO performApiSearch(String userPrompt) {
        System.out.println("Esecuzione della ricerca API con prompt: " + userPrompt);
        try {
            String encodedPrompt = URLEncoder.encode(userPrompt, StandardCharsets.UTF_8);
            String fullUrl = String.format("%s?q=%s&api_key=%s&engine=google",
                    baseUrl, encodedPrompt, apiKey);

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(fullUrl))
                    .header("Accept", "application/json") // Corretto l'header
                    .GET()
                    .build();

            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() == 200) {
                return parseSerpApiJson(userPrompt, response.body());
            } else {
                // Gestione di risposte non riuscite (es. 4xx, 5xx)
                System.err.println("Errore API. Codice di stato: " + response.statusCode() + ", Body: " + response.body());
                return new GoogleDTO(userPrompt, "Errore durante la ricerca. Codice: " + response.statusCode(), Collections.emptyList());
            }
        } catch (IOException | InterruptedException exception) {
            System.err.println("Errore durante la chiamata HTTP: " + exception.getMessage());
            Thread.currentThread().interrupt();
            return new GoogleDTO(userPrompt, "Errore di connessione: " + exception.getMessage(), Collections.emptyList());
        }
    }

    // Metodo per il parsing della risposta JSON da SerpApi
    private GoogleDTO parseSerpApiJson(String userPrompt, String jsonBody) throws IOException {
        SerpApiResponse serpApiResponse = objectMapper.readValue(jsonBody, SerpApiResponse.class);

        if (serpApiResponse.getOrganicResults() == null || serpApiResponse.getOrganicResults().isEmpty()) {
            return new GoogleDTO(userPrompt, "Nessun risultato trovato per la tua ricerca.", Collections.emptyList());
        }

        List<GoogleDTO.Source> sources = serpApiResponse.getOrganicResults().stream()
                .map(result -> new GoogleDTO.Source(result.getTitle(), result.getLink()))
                .collect(Collectors.toList());

        return new GoogleDTO(userPrompt, "Ecco i risultati della ricerca:", sources);
    }

    // Classi interne per mappare la risposta JSON
    @JsonIgnoreProperties(ignoreUnknown = true)
    private static class SerpApiResponse {
        @JsonProperty("organic_results")
        private List<OrganicResult> organicResults;

        public List<OrganicResult> getOrganicResults() {
            return organicResults;
        }
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    private static class OrganicResult {
        private String title;
        private String link;

        public String getTitle() {
            return title;
        }

        public String getLink() {
            return link;
        }
    }
}


