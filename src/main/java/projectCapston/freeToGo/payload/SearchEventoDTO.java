package projectCapston.freeToGo.payload;


import org.joda.time.LocalDateTime;


public record SearchEventoDTO(
         String apiId,
         String nome,
         LocalDateTime dataOra,
         String luogo,
         String descrizioneBreve,
         String linkOriginale,
         String categoria
) {

}
