package projectCapston.freeToGo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import projectCapston.freeToGo.entities.Eventi;


import java.util.List;
import java.util.UUID;

public interface EventiRepository extends JpaRepository<Eventi, UUID>, JpaSpecificationExecutor<Eventi> {
    List<Eventi>findByOrganizzatore_Id(UUID organizzatoreId);
    List<Eventi> findByUtente_Id(UUID utenteId);
    @Query("SELECT e FROM Eventi e WHERE e.utente.id = :utenteId")
    List<Eventi> findByutenteIdCustom(@Param("utenteId")UUID utenteId);

}
