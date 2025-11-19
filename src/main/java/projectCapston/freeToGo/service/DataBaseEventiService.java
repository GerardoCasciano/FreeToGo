package projectCapston.freeToGo.service;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;

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


import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import static org.springframework.cloud.function.cloudevent.CloudEventMessageUtils.getId;

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

        Categoria categoria = categoriaRepository.findById(dto.categoriaId())
                .orElseThrow(() -> new NotFoundException("Categoria con ID " + dto.categoriaId() + " non trovata."));

        TipoDiEvento tipoDiEvento = tipoDiEventoRepository.findByNome(dto.tipoEventoNome())
                .orElseGet(() -> {
                    TipoDiEvento newTipoDiEvento = new TipoDiEvento();
                    newTipoDiEvento.setNome(dto.tipoEventoNome());
                    newTipoDiEvento.setCategoria(categoria);
                    return tipoDiEventoRepository.save(newTipoDiEvento);
                });





        Eventi nuovoEvento = new Eventi();
        nuovoEvento.setTitolo(dto.titolo());
        nuovoEvento.setDescrizione(dto.descrizione());
        nuovoEvento.setAvatarUrl(dto.avatarUrl());
        nuovoEvento.setDataOra(dto.dataOra());
        nuovoEvento.setCitta(dto.citta());
        nuovoEvento.setVia(dto.via());
        nuovoEvento.setLatitudine(dto.latitudine());
        nuovoEvento.setLongitudine(dto.longitudine());
        nuovoEvento.setPrezzo(dto.prezzo());

        nuovoEvento.setTipoEvento(tipoDiEvento);
        nuovoEvento.setCategoria(categoria);
        nuovoEvento.setOrganizzatore(organizzatore);
        nuovoEvento.setUtente(utenteAutenticato);
        nuovoEvento.setDataCreazione(LocalDateTime.now());

        return eventiRepository.save(nuovoEvento);
    }
    //Trova eventi tramite utente autenticato
    public List<Eventi> findMyEventi(Utente utente){
        return eventiRepository.findByOrganizzatoreId(utente.getId());
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
