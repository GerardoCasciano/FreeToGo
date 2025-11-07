package projectCapston.freeToGo.exceptions;

public class UtenteEsistenteException extends RuntimeException {
    public UtenteEsistenteException(String email) {
        super("L'utente con " + email + "è già registrato.");
    }
}
