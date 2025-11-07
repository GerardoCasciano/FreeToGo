package projectCapston.freeToGo.payload;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;



public record LoginRequestDTO(
        @NotBlank(message = "L'email è obbligatoria")
        @Email(message = "Formato mail non valido")
        String email,
        @NotBlank(message = "La password è obbligatoria")
        String password) {
}
