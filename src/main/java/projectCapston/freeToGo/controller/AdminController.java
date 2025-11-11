package projectCapston.freeToGo.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import projectCapston.freeToGo.entities.Utente;
import projectCapston.freeToGo.payload.UtenteDTO;
import projectCapston.freeToGo.service.UtenteService;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/admin/user")
public class AdminController {
    private final UtenteService utenteService;
    public AdminController(UtenteService utenteService){
        this.utenteService=utenteService;
    }
    //Endpoint per visualizzare tutti gli utenti da parte di ADMIN
    @GetMapping
    public ResponseEntity<List<UtenteDTO>> getALlUtenti(){
        List<UtenteDTO> utenti=utenteService.getAllUtenti();
        return ResponseEntity.ok(utenti);
    }
    //Eliminare solo per ADMIN
    @DeleteMapping("/{userId}")
    public ResponseEntity<Void> deleteUser(@PathVariable UUID userId){
        utenteService.deleteUserByAdmin(userId);
        return ResponseEntity.noContent().build();
    }
    @PatchMapping("/{userId}/ruolo")
    public ResponseEntity<Utente> updateUtenteRuolo(
            @PathVariable UUID userId,
            @RequestBody projectCapston.freeToGo.payload.RuoloUpdateRequestDTO request){
        Utente utenteAggiornato=utenteService.updateRole(
                userId,
                request.nuovoRuolo()
        );
        return ResponseEntity.ok(utenteAggiornato);
    }
}
