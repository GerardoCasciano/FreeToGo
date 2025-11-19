package projectCapston.freeToGo.payload;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;
import java.util.UUID;

public record EventoRequestDTO(
        @NotBlank(message = "Il titolo dell'evento è obbligatorio")
        String titolo,
        @NotBlank(message = "La descrizione è obbligatoria")
        String descrizione,
        String avatarUrl,
        @NotNull(message = "La data e l'ora sono obbligatorie")
        LocalDateTime dataOra,
        @NotBlank(message = "La città è obbligatoria")
        String citta,
        String via,
        String regione,
        double latitudine,
        double longitudine,
        Double prezzo,
        @NotBlank(message = "Il nome del tipo di evento è obbligatorio")
        String tipoEventoNome,
        @NotNull(message = "L'ID della categoria è obbligatorio")
        UUID categoriaId,
        @NotNull(message = "L'ID dell'organizzatore è obbligatorio")
        UUID organizzatoreId
) {
}
