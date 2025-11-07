package projectCapston.freeToGo.payload;

import java.time.LocalDateTime;

public record EventoRequestDTO (
        String titolo,
        String categoria,
        String descrizione,
        String avatarUrl,
        LocalDateTime dataOra,
        String citta,
        String regione,
        double latitudine,
        double longitudine
){
}
