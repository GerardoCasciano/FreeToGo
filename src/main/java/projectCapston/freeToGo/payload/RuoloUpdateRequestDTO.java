package projectCapston.freeToGo.payload;


import jakarta.validation.constraints.NotNull;
import projectCapston.freeToGo.entities.Ruoli;

public record RuoloUpdateRequestDTO (
        @NotNull(message = "Il ruolo non può essere nullo")
        Ruoli nuovoRuolo
){

}


