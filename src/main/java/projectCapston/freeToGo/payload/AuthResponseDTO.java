package projectCapston.freeToGo.payload;

import java.util.UUID;

public record AuthResponseDTO(UUID id, String accessToken, String nome, String cognome, String ruoli) {
}
