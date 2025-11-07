package projectCapston.freeToGo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import projectCapston.freeToGo.entities.Ruolo;

import java.util.Optional;
import java.util.UUID;

public interface RuoloRepository extends JpaRepository<Ruolo, UUID> {
    @Query("SELECT role FROM Ruolo role WHERE role.nome = :nome")
    Optional<Ruolo> findByNome(@Param("nome") projectCapston.freeToGo.entities.Ruoli nome);
}
