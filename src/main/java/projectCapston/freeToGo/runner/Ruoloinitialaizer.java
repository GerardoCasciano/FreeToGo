package projectCapston.freeToGo.runner;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import projectCapston.freeToGo.entities.Ruoli;
import projectCapston.freeToGo.entities.Ruolo;
import projectCapston.freeToGo.repositories.RuoloRepository;

import java.util.Arrays;

@Component
@Slf4j
@Order(1)
public class Ruoloinitialaizer implements CommandLineRunner {
    private final RuoloRepository ruoloRepository;

    public Ruoloinitialaizer(RuoloRepository ruoloRepository){
        this.ruoloRepository = ruoloRepository;
    }
    //questo metodo vinene eseguito dopo l'avvio dell'applicazione

    @Override
    public void run (String...orgs) throws Exception{
        final String NOME_RUOLO="USER";
        log.info("---INIZIALIZZAZIONE RUOLI---");
        //Controllo se il ruolo USER esiste nel DB
       Arrays.stream(Ruoli.values()).forEach(nomeRuolo -> { if (ruoloRepository.findByNome(Ruoli.valueOf(NOME_RUOLO)).isEmpty()){
           //Se non esiste ,crea una nuova istanza e imposta il nome
           Ruolo nuovoRuolo= new Ruolo();
           nuovoRuolo.setNome(Ruoli.valueOf(NOME_RUOLO));
           //Salva la nuov istanza nel DB
           ruoloRepository.save(nuovoRuolo);
           log.info("Ruolo {} creato e  salvato  con successo.",NOME_RUOLO);

       }else {
           log.info("Ruolo già esistente nel DB.");
       }
       });
           log.info("--FINE INIZIALIZZAZIONE RUOLI----");
       }








}
