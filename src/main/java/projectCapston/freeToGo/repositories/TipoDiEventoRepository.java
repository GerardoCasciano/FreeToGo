package projectCapston.freeToGo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import projectCapston.freeToGo.entities.TipoDiEvento;

import java.util.List;
import java.util.UUID;

public interface TipoDiEventoRepository extends JpaRepository <TipoDiEvento, UUID>{
    List<TipoDiEvento> findByCategoriaId(UUID categoriaId);
}
