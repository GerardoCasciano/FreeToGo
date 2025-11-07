package projectCapston.freeToGo.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import projectCapston.freeToGo.entities.Utente;
import projectCapston.freeToGo.exceptions.ValidationException;
import projectCapston.freeToGo.payload.RegistroRequestDTO;
import projectCapston.freeToGo.payload.RuoloUpdateRequestDTO;
import projectCapston.freeToGo.service.UtenteService;


import org.springframework.web.bind.annotation.ResponseStatus;


import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;


@Validated
@RestController
@RequestMapping("/api/utenti")
public class UtenteController {
    @Autowired
    private UtenteService utenteService;
    //Endpoint solo per ADMIN
    @GetMapping
    public ResponseEntity<List<Utente>> getAllUtenti(){
List<Utente> utenti =utenteService.findAll();
return ResponseEntity.ok(utenti);
    }
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Utente createUtente(@RequestBody @Validated RegistroRequestDTO newUserDTO, BindingResult validation) {
        if (validation.hasErrors()) {
            throw new ValidationException(validation.getAllErrors().stream()
                    .map(DefaultMessageSourceResolvable::getDefaultMessage).collect(
                            Collectors.toList()));
        }
        return utenteService.registerUser(newUserDTO);
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
    @PatchMapping("/{userId}/ruolo")
    public ResponseEntity<Utente> updateUtenteRuolo(
            @PathVariable UUID userId,
            @RequestBody RuoloUpdateRequestDTO request){
        Utente utenteAggiornato=utenteService.updateRole(
                userId,
                request.getNuovoRuolo()
        );
        return ResponseEntity.ok(utenteAggiornato);
    }
    @DeleteMapping("/{userId}")
    public ResponseEntity<Void> deleteUtente(@PathVariable UUID userId){
        utenteService.deleteById(userId);
        return ResponseEntity.noContent().build();
    }
}
