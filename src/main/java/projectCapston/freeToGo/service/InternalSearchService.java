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
public class InternalSearchService {

    @Autowired
    private EventiRepository eventiRepository;

    public List<Eventi> findEvents(LocalDate date, String luogo, String categoria, Double maxPrezzo) {
        List<Specification<Eventi>> specs = new ArrayList<>();

        //  filtro per data
        if (date != null) {
            specs.add((root, query, cb) -> cb.equal(root.get("dataOra").as(LocalDate.class), date));
        }

        // filtro per luogo (città)
        if (luogo != null && !luogo.isEmpty()) {
            specs.add((root, query, cb) -> cb.like(cb.lower(root.get("citta")), "%" + luogo.toLowerCase() + "%"));
        }

        // filtro per prezzo massimo
        if (maxPrezzo != null) {
            specs.add((root, query, cb) -> cb.lessThanOrEqualTo(root.get("prezzo"), maxPrezzo));
        }

        //  filtro per nome della categoria (CORRETTA)
        if (categoria != null && !categoria.isEmpty()) {
            specs.add((root, query, cb) -> {
                query.distinct(true);
                // La join corretta: Eventi -> tipoEvento -> categoria -> nome
                return cb.equal(root.join("tipoEvento").join("categoria").get("nome"), categoria);
            });
        }

        if (specs.isEmpty()) {
            return eventiRepository.findAll();
        }

        Specification<Eventi> finalSpec = Specification.allOf(specs);
        return eventiRepository.findAll(finalSpec);
    }
}
