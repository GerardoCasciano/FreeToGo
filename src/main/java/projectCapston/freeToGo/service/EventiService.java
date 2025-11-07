package projectCapston.freeToGo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import projectCapston.freeToGo.entities.Eventi;
import projectCapston.freeToGo.repositories.EventiRepository;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class EventiService {

    @Autowired
    private EventiRepository eventiRepository;

    public List<Eventi> findEvents(LocalDate date, String regione, String categoria) {
        List<Specification<Eventi>> specs = new ArrayList<>();
//Logica di filtro
        if (date != null) {
            specs.add((root, query, cb) -> cb.equal(root.get("dataOra").as(LocalDate.class), date));
        }

        if (regione != null && !regione.isEmpty()) {
            specs.add((root, query, cb) -> cb.equal(root.get("citta"), regione));
        }

        if (categoria != null && !categoria.isEmpty()) {
            specs.add((root, query, cb) -> {
                query.distinct(true);
                return cb.equal(root.join("categoria").get("nome"), categoria);
            });
        }


        // Se la lista di specifiche è vuota, findAll non applicherà filtri.
        Specification<Eventi> finalSpec = Specification.allOf(specs);

        return eventiRepository.findAll(finalSpec);
    }
}
