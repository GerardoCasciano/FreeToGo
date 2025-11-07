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
        LocalDate dataOra,
        String citta,
        double latitudine,
        double longitudine,
        UUID organizzatore,
        LocalDateTime dataCreazione,
        LocalDateTime dataUltimaModifica

) {
}
