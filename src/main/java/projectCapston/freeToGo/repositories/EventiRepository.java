package projectCapston.freeToGo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import projectCapston.freeToGo.entities.Eventi;


import java.util.List;
import java.util.UUID;

public interface EventiRepository extends JpaRepository<Eventi, UUID>, JpaSpecificationExecutor<Eventi> {
    List<Eventi>findByOrganizzatoreId(UUID organizzatoreId);

}
