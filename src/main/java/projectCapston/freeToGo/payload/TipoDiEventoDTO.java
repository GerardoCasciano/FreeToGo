package projectCapston.freeToGo.payload;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.UUID;

public record TipoDiEventoDTO (
    UUID id,
    @NotBlank(message = "Il nome è obbligatorio")
    @Size(max = 100,message = "Il nome non può superare 100 caratteri")
    String nome,

    @Size(max=500 ,message = "La descizione non può superare i 300 caratteri")
    String descrizione,

    @NotNull(message = "L'ID della categoria è obblicatoria")
    UUID categoriaId
) {
}
