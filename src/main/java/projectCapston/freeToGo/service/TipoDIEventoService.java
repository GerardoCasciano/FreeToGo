package projectCapston.freeToGo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import projectCapston.freeToGo.entities.Categoria;
import projectCapston.freeToGo.entities.TipoDiEvento;
import projectCapston.freeToGo.exceptions.NotFoundException;
import projectCapston.freeToGo.payload.TipoDiEventoDTO;
import projectCapston.freeToGo.repositories.CategoriaRepository;
import projectCapston.freeToGo.repositories.TipoDiEventoRepository;

import java.util.List;
import java.util.UUID;

@Service
public class TipoDIEventoService {
    @Autowired
    private TipoDiEventoRepository tipoDiEventoRepository;
    @Autowired
    private CategoriaRepository categoriaRepository;


//Recupera tutti i tipi dievento
    public List<TipoDiEvento> getAllTipiEvento() {
        return tipoDiEventoRepository.findAll();
    }
    //Trova per id categpria
    public List<TipoDiEvento> findByCategoriaId(UUID categoriaId) {
        return tipoDiEventoRepository.findByCategoriaId(categoriaId);
    }
//Trova tipi di evento
    public TipoDiEvento getTipoEventoById(UUID id) {
        return tipoDiEventoRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Tipo di evento con ID " + id + " non trovato"));
    }
//Crea tipi di evento
    public TipoDiEvento createTipoEvento(TipoDiEventoDTO dto) {
        TipoDiEvento tipoDiEvento = convertDtoToEntity(dto);
        return tipoDiEventoRepository.save(tipoDiEvento);
    }
//Aggiorna e salva  tipi di evento
    public TipoDiEvento updateTipoEvento(UUID id, TipoDiEventoDTO dto) {
        TipoDiEvento existingTipoEvento = getTipoEventoById(id);
        Categoria categoria = categoriaRepository.findById(dto.categoriaId())
                .orElseThrow(() -> new NotFoundException("Categoria con ID " + dto.categoriaId() + " non trovata"));

        existingTipoEvento.setNome(dto.nome());
        existingTipoEvento.setCategoria(categoria);

        return tipoDiEventoRepository.save(existingTipoEvento);
    }
//Cancella
    public void deleteTipoEvento(UUID id) {
        if (!tipoDiEventoRepository.existsById(id)) {
            throw new NotFoundException("Tipo di evento con ID " + id + " non trovato");
        }
        tipoDiEventoRepository.deleteById(id);
    }

    private TipoDiEvento convertDtoToEntity(TipoDiEventoDTO dto) {
        Categoria categoria = categoriaRepository.findById(dto.categoriaId())
                .orElseThrow(() -> new NotFoundException("Categoria con ID " + dto.categoriaId() + " non trovata"));

        TipoDiEvento tipoDiEvento = new TipoDiEvento();
        tipoDiEvento.setNome(dto.nome());
        tipoDiEvento.setCategoria(categoria);

        return tipoDiEvento;
    }
}
