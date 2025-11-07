package projectCapston.freeToGo.payload;

import java.time.LocalDateTime;
import java.util.UUID;

public record UtenteDTO(
        UUID id,
        String nome,
        String email,
        String password,
        LocalDateTime dataCreazione,
        LocalDateTime dataUltimaModifica,
        String avatarUrl


) {
}
