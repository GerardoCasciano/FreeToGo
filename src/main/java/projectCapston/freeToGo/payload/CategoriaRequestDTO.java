package projectCapston.freeToGo.payload;

import jakarta.validation.constraints.NotBlank;

import jakarta.validation.constraints.Size;

public record CategoriaRequestDTO(
        @NotBlank(message = "il nome della categoria è obbligatorio.")
        @Size(max = 50,message = "Il nome non può superare i 50 caratteri.")
        String nome,
        @NotBlank(message = "La descrizione della categoria è obbligatoria.")
        @Size(max = 100, message = "La descrizione non può superare i 100 caratteri.")
        String descrizione
) {

}
