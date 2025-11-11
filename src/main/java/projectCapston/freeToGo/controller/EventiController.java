package projectCapston.freeToGo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import projectCapston.freeToGo.entities.Eventi;
import projectCapston.freeToGo.entities.Utente;
import projectCapston.freeToGo.payload.EventiResponseDTO;
import projectCapston.freeToGo.payload.EventoRequestDTO;
import projectCapston.freeToGo.payload.GoogleDTO;
import projectCapston.freeToGo.service.DataBaseEventiService;
import projectCapston.freeToGo.service.EventoSearchService;
import projectCapston.freeToGo.service.UtenteService;

import java.time.LocalDate;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/eventi")
@CrossOrigin(origins = "http://localhost:3005")
public class EventiController {
    @Autowired
    private DataBaseEventiService eventiService;
    @Autowired
    private UtenteService utenteService;
    @Autowired
    private EventoSearchService eventoSearchService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public EventiResponseDTO creaNuovoEvento(
            @RequestBody @Validated EventoRequestDTO eventoDTO,
            @AuthenticationPrincipal Utente utente) {
        Eventi nuovoEvento = eventiService.createEvento(eventoDTO, utente);
        return new EventiResponseDTO(
                nuovoEvento.getId(),
                nuovoEvento.getTitolo(),
                nuovoEvento.getTipoEvento().getCategoria().getNome(),
                nuovoEvento.getDescrizione(),
                nuovoEvento.getAvatarUrl(),
                nuovoEvento.getDataOra(),
                nuovoEvento.getCitta(),
                nuovoEvento.getLatitudine(),
                nuovoEvento.getLongitudine(),
                nuovoEvento.getPrezzo(),
                nuovoEvento.getOrganizzatore().getId(),
                nuovoEvento.getDataCreazione(),
                nuovoEvento.getDataUltimaModifica()
        );
    }

    //metodo per ricerca esterna
    @GetMapping("/search")
    public ResponseEntity<GoogleDTO> searchEventi(@RequestParam String prompt) {
        if (prompt == null || prompt.trim().isEmpty()) {
            GoogleDTO response = new GoogleDTO(
                    "",
                    "il prompt di ricerca non può essere vuoto.",
                    Collections.emptyList()
            );
            return ResponseEntity.badRequest().body(response);
        }
        //Esecuzione della ricerca tramite EventoSeachService
        GoogleDTO searchResult = eventoSearchService.performApiSearch(prompt);
        //Verifica dello stato di ricerca
        if (searchResult.getGeneratedResponse().startsWith("Errore")) {
            //Se API fallisce, restituisci 503 Service Unavailable
            return ResponseEntity.status(503).body(searchResult);
        }
        // Se la ricerca ha successo, restituisci 200 OK
        return ResponseEntity.ok(searchResult);
    }
}
