package projectCapston.freeToGo.exceptions;

import java.util.UUID;

public class NotFoundException extends RuntimeException {
    public NotFoundException(UUID id) {
        super("La risorsa con id " + id  + " non è stata trovata");
    }

    public NotFoundException(String message) {
        super(message);
    }

    //Eccezione usata quando la risorsa è cercata tramire un altro campo ()es. mail o nome
    public NotFoundException (String parametro, String valore){
        super("Risorsa con " + parametro + "=" + valore + " non trovata.");
    }


}