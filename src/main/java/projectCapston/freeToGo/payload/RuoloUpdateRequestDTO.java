package projectCapston.freeToGo.payload;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import projectCapston.freeToGo.entities.Ruoli;
@Getter
@Setter
public class RuoloUpdateRequestDTO {
    @NotNull(message = "Il ruolo non può essere nullo")
    private Ruoli nuovoRuolo;

    public RuoloUpdateRequestDTO() {
    }

    public RuoloUpdateRequestDTO(Ruoli nuovoRuolo) {
        this.nuovoRuolo = nuovoRuolo;
    }
}
