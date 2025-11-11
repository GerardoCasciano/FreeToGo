package projectCapston.freeToGo.payload;

import projectCapston.freeToGo.entities.Utente;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

public record EventiResponseDTO(
        UUID id,
        String titolo,
        String categoria,
        String descrizione,
        String avatarUrl,
        LocalDateTime dataOra,
        String citta,
        double latitudine,
        double longitudine,
        Double prezzo,
        UUID organizzatore,
        LocalDateTime dataCreazione,
        LocalDateTime dataUltimaModifica

) {
}
