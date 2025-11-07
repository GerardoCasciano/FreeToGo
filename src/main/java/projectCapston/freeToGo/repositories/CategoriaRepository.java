package projectCapston.freeToGo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import projectCapston.freeToGo.entities.Categoria;

import java.util.Optional;
import java.util.UUID;

public interface CategoriaRepository extends JpaRepository<Categoria, UUID> {
    Optional<Categoria> findByNome(String nome);

    boolean existsByNome(String nome);
}
