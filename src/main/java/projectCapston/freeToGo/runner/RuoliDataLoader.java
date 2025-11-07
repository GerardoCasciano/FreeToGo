package projectCapston.freeToGo.runner;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import projectCapston.freeToGo.entities.Ruoli;
import projectCapston.freeToGo.entities.Ruolo;
import projectCapston.freeToGo.repositories.RuoloRepository;

@Component
public class RuoliDataLoader implements CommandLineRunner {
    private final RuoloRepository ruoloRepository;
    public RuoliDataLoader(RuoloRepository ruoloRepository){
        this.ruoloRepository=ruoloRepository;
    }
    @Override
    public void run(String... orgs) throws Exception{
        //lista dei ruoli
        creaRuoloSeNonEsiste("USER");
        creaRuoloSeNonEsiste("ADMIN");

        System.out.println("Verifica e creazione dei ruoli.");
    }

    private void creaRuoloSeNonEsiste(String nomeRuolo) {
        // Utilizza findByNome per controllare se il ruolo esiste già nel DB


        if (ruoloRepository.findByNome(Ruoli.valueOf(nomeRuolo)).isEmpty()) {
            Ruolo nuovoRuolo = new Ruolo(Ruoli.valueOf(nomeRuolo));
            ruoloRepository.save(nuovoRuolo);
            System.out.println("Ruolo creato: " + nomeRuolo);
        } else {
            System.out.println("Ruolo esistente: " + nomeRuolo);
        }
    }

}
