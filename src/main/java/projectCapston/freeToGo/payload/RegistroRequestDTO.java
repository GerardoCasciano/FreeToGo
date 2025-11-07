package projectCapston.freeToGo.payload;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;


import lombok.Getter;

import lombok.ToString;


//Questo DTO serve per la richiesta di regisrazione di un nuovo utente

public record RegistroRequestDTO(
        @NotBlank(message = "Il nome è obbligatorio")
        String nome,
        @NotBlank(message = "Il cognome è obbligatorio")
        String cognome,
        @NotBlank(message = "La mail è obbligatoria")
        @Email(message = "l'email deve essere valida")
        String email,
        @NotBlank(message = "la password è obblicatoria")
        @Size(min = 6,message = "La password deve contenere almeno 6 caratteri")
        String password
) {
}
