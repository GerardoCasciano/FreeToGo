package projectCapston.freeToGo.exceptions;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authorization.AuthorizationDeniedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import projectCapston.freeToGo.payload.ErrorResponseDTO;
import java.util.stream.Collectors;
import java.time.LocalDateTime;
import java.util.List;


@RestControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {
    @ExceptionHandler(NotFoundException.class)


    public ResponseEntity<ErrorResponseDTO> handlerNotFound(NotFoundException exception){

        //Errore 404

        HttpStatus status = HttpStatus.NOT_FOUND;

        ErrorResponseDTO errorResponse = new ErrorResponseDTO(
                exception.getMessage(),
                LocalDateTime.now(),
                status.value(),
                status.getReasonPhrase()
        );
        return new ResponseEntity<>(errorResponse,status);
    }
    // Gestione Eccezione 409 (Utente già esistente)
    @ExceptionHandler(UtenteEsistenteException.class)
    public ResponseEntity<ErrorResponseDTO>handleUtenteEsistente(UtenteEsistenteException exception){
        HttpStatus status = HttpStatus.CONFLICT;

        ErrorResponseDTO errorResponse = new ErrorResponseDTO(
                exception.getMessage(),
                LocalDateTime.now(),
                status.value(),
                status.getReasonPhrase()
        );
        return new ResponseEntity<>(errorResponse , status);
    }

    @ExceptionHandler(ValidationException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponseDTO handleValitationeErrors(ValidationException exception){
        HttpStatus status = HttpStatus.BAD_REQUEST;
        return new ErrorResponseDTO(exception.getMessage(),LocalDateTime.now(),status.value(),status.getReasonPhrase());
    }


    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException exception, HttpHeaders headers, HttpStatusCode status, WebRequest request) {
        List<String> errorsMessage = exception.getBindingResult().getFieldErrors().stream()
                .map(error -> error.getField() + ": " + error.getDefaultMessage())
                .collect(Collectors.toList());

        String errorMessage = String.join(", ", errorsMessage);

        ErrorResponseDTO errorResponse = new ErrorResponseDTO(
                errorMessage,
                LocalDateTime.now(),
                status.value(),
                "Validation Failed"
        );

        return new ResponseEntity<>(errorResponse, headers, status);
    }
    //Errore 400
    @ExceptionHandler(BadRequestException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponseDTO handleBadrequest(BadRequestException exception){
        HttpStatus status = HttpStatus.BAD_REQUEST;
        return new ErrorResponseDTO(exception.getMessage(),LocalDateTime.now(),status.value(),status.getReasonPhrase());
    }

//500
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler(Exception.class)
    public ErrorResponseDTO heandleServiceError(Exception exception){
        exception.printStackTrace();

        Throwable cause = exception;
        while (cause.getCause() != null){
            cause = cause.getCause();
        }
        String message = cause.getMessage();
        if(message == null || message.isBlank())message = exception.getClass().getSimpleName();
        HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;
        return new ErrorResponseDTO(message,LocalDateTime.now(),status.value(),status.getReasonPhrase());
    }
    //403 Problemi di autorizzazione
    @ExceptionHandler(AuthorizationDeniedException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public ErrorResponseDTO handleForbidden(AuthorizationDeniedException exception){
        HttpStatus status =HttpStatus.FORBIDDEN;
        return new ErrorResponseDTO(exception.getMessage(), LocalDateTime.now(),status.value(),status.getReasonPhrase());
    }
}
