package projectCapston.freeToGo.controller;

import org.springframework.security.core.Authentication;
import org.hibernate.dialect.unique.CreateTableUniqueDelegate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.User;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import projectCapston.freeToGo.entities.Utente;

import projectCapston.freeToGo.exceptions.BadRequestException;
import projectCapston.freeToGo.exceptions.ValidationException;
import projectCapston.freeToGo.payload.AuthResponseDTO;
import projectCapston.freeToGo.payload.LoginRequestDTO;

import projectCapston.freeToGo.payload.RegistroRequestDTO;
import projectCapston.freeToGo.service.UtenteService;

import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;




@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UtenteService utenteService;


    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public Utente createUtente(@RequestBody @Validated RegistroRequestDTO payload , BindingResult validationResult){
        if(validationResult.hasErrors()){
            List<String>errors= validationResult.getAllErrors().stream()
                    .map(DefaultMessageSourceResolvable::getDefaultMessage)
            .collect(Collectors.toList());
            throw new ValidationException(errors);
        }
        return this.utenteService.registerUser(payload);
    }


    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(@RequestBody @Validated LoginRequestDTO request) {
   try{
       AuthResponseDTO response= utenteService.login(request);
       //se l'autenticazione ha successo ,restituisce 200 con il token
       return  ResponseEntity.ok(response);
   } catch (Exception e) {

       System.err.println("Login fallito per l'utente" + request.email() + ":" + e.getMessage());
       return  ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
   }
    }
    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(Authentication authentication){
        if (authentication == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Collections.singletonMap("message", "Token non valido o scaduto."));
        }

        Object principal = authentication.getPrincipal();

        if (principal instanceof Utente) {
            Utente utente = (Utente) principal;
            return ResponseEntity.ok(utente);
        }
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.singletonMap("message", "Impossibile recuperare i dettagli dell'utente."));
        }
    }
