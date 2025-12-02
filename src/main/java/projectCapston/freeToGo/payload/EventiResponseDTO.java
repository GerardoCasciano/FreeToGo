package projectCapston.freeToGo.payload;




import java.time.LocalDateTime;
import java.util.UUID;

public record EventiResponseDTO(
        UUID id,
        String titolo,
        String descrizione,
        String avatarUrl,
        LocalDateTime dataOra,
        String citta,
        String via,
        String regione,
        String categoriaNome,
        String tipoEventoNome,
        double latitudine,
        double longitudine,
        Double prezzo,
        UUID organizzatore,
        LocalDateTime dataCreazione,
        LocalDateTime dataUltimaModifica

) {
}
