package projectCapston.freeToGo.payload;




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
        String via,
        String regione,
        String nome,
        String tipoEvento,
        double latitudine,
        double longitudine,
        Double prezzo,
        UUID organizzatore,
        LocalDateTime dataCreazione,
        LocalDateTime dataUltimaModifica

) {
}
