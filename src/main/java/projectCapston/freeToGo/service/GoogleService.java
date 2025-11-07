package projectCapston.freeToGo.service;

import org.springframework.stereotype.Service;
import projectCapston.freeToGo.payload.GoogleDTO;

import java.util.List;


@Service
public class GoogleService {
   pubblic GoogleDTO generateContentWithGrounding(String userPrompt){
       System.out.println("Proccessing prompt: " + userPrompt);
        List<String> simulatedSource = generatedSimulatedSource(userPrompt);

        return new GoogleDTO(userPrompt, simulatedResponse,simulatedSource);
    }
private String generatedSimulatedResponse(String prompt){
       if (prompt.toLowerCase().contains("aiuto")){
           return  "Sono un assistente per aiutarti a generare i dati di ricerca web";
       } else if (prompt.toLowerCase().contains("viaggio")) {
           return "Ris"
           
       }
}

}


