package projectCapston.freeToGo.service;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import projectCapston.freeToGo.entities.Categoria;
import projectCapston.freeToGo.entities.Eventi;
import projectCapston.freeToGo.entities.TipoDiEvento;
import projectCapston.freeToGo.entities.Utente;
import projectCapston.freeToGo.exceptions.NotFoundException;
import projectCapston.freeToGo.exceptions.ResourseNotFoundException;
import projectCapston.freeToGo.payload.EventoRequestDTO;
import projectCapston.freeToGo.repositories.CategoriaRepository;
import projectCapston.freeToGo.repositories.EventiRepository;
import projectCapston.freeToGo.repositories.TipoDiEventoRepository;
import projectCapston.freeToGo.repositories.UtenteRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class DataBaseEventiService {

    @Autowired
    private EventiRepository eventiRepository;
    @Autowired
    private UtenteRepository utenteRepository;
    @Autowired
    private TipoDiEventoRepository tipoDiEventoRepository;
    @Autowired
    private CategoriaRepository categoriaRepository;

    public Eventi createEvento(EventoRequestDTO dto, Utente utenteAutenticato) {
        Utente organizzatore = utenteRepository.findById(dto.organizzatoreId())
                .orElseThrow(() -> new NotFoundException("Organizzatore con ID " + dto.organizzatoreId() + " non trovato."));

        TipoDiEvento tipoDiEvento = tipoDiEventoRepository.findById(dto.tipoEventoId())
                .orElseThrow(() -> new NotFoundException("Tipo di evento con ID " + dto.tipoEventoId() + " non trovato."));

        Categoria categoria = categoriaRepository.findById(dto.categoriaId())
                .orElseThrow(() -> new NotFoundException("Categoria con ID " + dto.categoriaId() + " non trovata."));

        Eventi nuovoEvento = new Eventi();
        nuovoEvento.setTitolo(dto.titolo());
        nuovoEvento.setDescrizione(dto.descrizione());
        nuovoEvento.setAvatarUrl(dto.avatarUrl());
        nuovoEvento.setDataOra(dto.dataOra());
        nuovoEvento.setCitta(dto.citta());
        nuovoEvento.setLatitudine(dto.latitudine());
        nuovoEvento.setLongitudine(dto.longitudine());
        nuovoEvento.setPrezzo(dto.prezzo());

        nuovoEvento.setTipoEvento(tipoDiEvento);
        nuovoEvento.setCategoria(categoria);
        nuovoEvento.setOrganizzatore(organizzatore);
        nuovoEvento.setUtente(utenteAutenticato); // L'utente che crea il record
        nuovoEvento.setDataCreazione(LocalDateTime.now());

        return eventiRepository.save(nuovoEvento);
    }

    //Salva nuovo evento
    public Eventi saveEvento(Eventi evento) {
        return eventiRepository.save(evento);
    }

    //Aggiorna evento esistente
    @Transactional
    public Eventi updateEvento(UUID id, Eventi updateEvento) {
        //check evento esistente
        Eventi existingEvento = eventiRepository.findById(id)
                .orElseThrow(() -> new ResourseNotFoundException("Evento non trovato con Id :" + id));
        //Aggiornamento campi
        existingEvento.setTitolo(updateEvento.getTitolo());
        existingEvento.setCitta(updateEvento.getCitta());
        existingEvento.setDataCreazione(updateEvento.getDataCreazione());
        existingEvento.setDataOra(updateEvento.getDataOra());
        existingEvento.setDescrizione(updateEvento.getDescrizione());
        existingEvento.setDataUltimaModifica(updateEvento.getDataUltimaModifica());
        existingEvento.setLatitudine(updateEvento.getLatitudine());
        existingEvento.setLongitudine(updateEvento.getLongitudine());
        existingEvento.setPrezzo(updateEvento.getPrezzo());
        //Salvo evevento aggionato
        return eventiRepository.save(existingEvento);
    }

    //Trova evento tramite id
    public Eventi findById(UUID id) {
        return eventiRepository.findById(id)
                .orElseThrow(() -> new ResourseNotFoundException("Evento non trovato con Id :" + id));
    }

    //Elimina evento tramite id
    @Transactional
    public void deleteEvente(UUID id) {
        if (!eventiRepository.existsById(id)) {

            throw new ResourseNotFoundException("Impossibile eliminare id non torvato." + id);
        }
        eventiRepository.deleteById(id);
    }
}
