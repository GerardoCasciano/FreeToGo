package projectCapston.freeToGo.service;

import com.fasterxml.jackson.databind.JsonNode;
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
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class GoogleService {
    private static final  String CATEGORIES_PERMESSE= "eventi culturali , musica, concerti ,sagre,teatro e sport.";

    @Value("${serpapi.baseurl}")
    private String baseUrl;

    @Value("${serpapi.apikey}")
    private String apiKey;

    private final HttpClient httpClient;
    private final ObjectMapper objectMapper;

    public GoogleService() {
        this.httpClient = HttpClient.newHttpClient();
        this.objectMapper = new ObjectMapper();
    }
 private  Boolean isPromptRelevant(String prompt){
        String lowerPrompt = prompt.toLowerCase();
        return  lowerPrompt.contains("concerto") ||
                lowerPrompt.contains("museo") ||
                lowerPrompt.contains("teatro") ||
                lowerPrompt.contains("sagra") ||
                lowerPrompt.contains("sport") ||
                lowerPrompt.contains("mostra") ||
                lowerPrompt.contains("musica") ||
                lowerPrompt.contains("evento culturale") ||
                lowerPrompt.contains("partita");
 }
    public GoogleDTO executeSearch(String userPrompt) {
        //Filtro per cintrollo prima di chiamare  SerpApi
        if (!isPromptRelevant(userPrompt)){
            System.out.println("Prompt non pertinente" + userPrompt);
            return new GoogleDTO(
                    null,"Richiesta non pertinente :questo sistema solo ricerche relative a : " + CATEGORIES_PERMESSE,
                    Collections.emptyList()
            );
        }


        //La zona d'italia verrà inclusa nel userPrompt e verrà gestita da google search

        System.out.println("Esecuzione della ricerca SerApi: " + userPrompt);
        try {
            String encodedPrompt = URLEncoder.encode(userPrompt, StandardCharsets.UTF_8);
            String fullUrl = String.format("%s?q=%s&api_key=%s&engine=google",
                    baseUrl, encodedPrompt, apiKey);

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(fullUrl))
                    .header("Accept", "application/json")
                    .GET()
                    .build();

            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() == 200) {
                return parseSerpApiJson(userPrompt, response.body());
            } else {
                String error = String.format("Errore API Codice HTTP:%d. Messaggio: %s",
                        response.statusCode(), response.body());
                System.err.println(error);
                return new GoogleDTO(userPrompt, "Errore API; " + error, Collections.emptyList());
            }
        } catch (IOException | InterruptedException e) {
            System.err.println("Errore durante la chiamata HTTP: " + e.getMessage());
            Thread.currentThread().interrupt();
            return new GoogleDTO(userPrompt, "Errore di connessione; " + e.getMessage(), Collections.emptyList());
        }
    }

    private GoogleDTO parseSerpApiJson(String userPrompt, String responseBody) {
        try {
            JsonNode rootNode = objectMapper.readTree(responseBody);
            String generatedResponse = "Nessuna risposta trovata.";
            // 1. Dichiarata la lista per gli oggetti Source
            List<GoogleDTO.Source> structuredSources = new ArrayList<>();

            // Estrazione risposta principale
            JsonNode answerBox = rootNode.path("answer_box");
            if (!answerBox.isMissingNode() && answerBox.has("answer")) {
                generatedResponse = answerBox.path("answer").asText();
            } else if (!answerBox.isMissingNode() && answerBox.has("snippet")) {
                generatedResponse = answerBox.path("snippet").asText();
            }

            JsonNode knowledgeGraph = rootNode.path("knowledge_graph");
            if (generatedResponse.equals("Nessuna risposta trovata.") && !knowledgeGraph.isMissingNode() && knowledgeGraph.has("description")) {
                generatedResponse = knowledgeGraph.path("description").asText();
            }

            //  l'estrazione delle fonti
            JsonNode organicResults = rootNode.path("organic_results");
            if (organicResults.isArray()) {
                for (JsonNode result : organicResults) {
                    if (result.has("link") && result.has("title")) {
                        String title = result.path("title").asText();
                        String url = result.path("link").asText();
                        // Creazione nuovo oggetto Source e aggiunta alla lista strutturata
                        GoogleDTO.Source source = new GoogleDTO.Source(title, url);
                        structuredSources.add(source);
                    }
                }
            }

            // Fallback se non è stata trovata una risposta diretta
            if (generatedResponse.equals("Nessuna risposta trovata.") && organicResults.size() > 0) {
                generatedResponse = "Il primo risultato di ricerca suggerisce: " + organicResults.get(0).path("snippet").asText();
            }

            // 3. Passato il nuovo tipo di lista al costruttore
            return new GoogleDTO(userPrompt, generatedResponse, structuredSources);
        } catch (IOException exception) {
            System.err.println("Errore durante il parsing del JSON da SerpApi: " + exception.getMessage());
            System.err.println("Risposta JSON ricevuta: " + responseBody);
            return new GoogleDTO(userPrompt, "Errore nel processare la risposta del servizio.", Collections.emptyList());
        }
    }
}
