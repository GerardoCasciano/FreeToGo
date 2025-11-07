package projectCapston.freeToGo.payload;

import java.time.LocalDateTime;



public record ErrorResponseDTO(
        String message,
        LocalDateTime timestamp,
        int status,
        String error
) {
}
