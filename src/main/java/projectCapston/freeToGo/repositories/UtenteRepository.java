package projectCapston.freeToGo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import projectCapston.freeToGo.entities.Utente;

import java.util.Optional;
import java.util.UUID;

public interface UtenteRepository extends JpaRepository<Utente, UUID> {
    //Verifica se esiste l'email

    boolean existsByEmail(String email);


    Optional<Utente> findByEmail(String email);

}
