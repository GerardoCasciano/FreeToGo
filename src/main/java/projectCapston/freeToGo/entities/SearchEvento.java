package projectCapston.freeToGo.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.joda.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SearchEvento{
    private String apiId;
    private String nome;
    private LocalDateTime dataOra;
    private String luogo;
    private String descrizioneBreve;
    private String linkOriginale;
    private String categoria;
}