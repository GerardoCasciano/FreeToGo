package projectCapston.freeToGo.controller;


import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import projectCapston.freeToGo.entities.Utente;

import projectCapston.freeToGo.service.UtenteService;


import java.io.IOException;
import java.util.List;
import java.util.UUID;



@Validated
@RestController
@RequestMapping("/api/utenti")
@CrossOrigin(origins = "http://localhost:5173")
public class UtenteController {
    @Autowired
    private UtenteService utenteService;
    //Endpoint solo per ADMIN
    @GetMapping
    public ResponseEntity<List<Utente>> getAllUtenti(){
List<Utente> utenti =utenteService.findAll();
return ResponseEntity.ok(utenti);
    }
    //Endpoint per avatar
    @PostMapping("/{id}/avatar")
    public Utente uploadAvatar(@PathVariable UUID id, @RequestParam("avatar")MultipartFile file) throws IOException{
        return  utenteService.uploadAvatar(id , file);
    }
    //Richiede Autorizzazione
    @GetMapping("/{userId}")
    public ResponseEntity<Utente> getUtenteById(@PathVariable UUID userId){
        Utente utente= utenteService.findById(userId);
        return ResponseEntity.ok(utente);
    }
    //Richiede Autorizzazione
@PutMapping("/{userId}")
    public ResponseEntity<Utente> updateUtente(
            @PathVariable UUID userId,
            @RequestBody Utente utenteDetails
    ){
        Utente utenteAggiornato = utenteService.update(userId,utenteDetails);
        return  ResponseEntity.ok(utenteAggiornato);
    }
    @DeleteMapping("/{userId}")
    public ResponseEntity<Void> deleteUtente(@PathVariable UUID userId){
        utenteService.deleteById(userId);
        return ResponseEntity.noContent().build();
    }
}
