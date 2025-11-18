package projectCapston.freeToGo.runner;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import projectCapston.freeToGo.entities.Ruoli;
import projectCapston.freeToGo.entities.Ruolo;
import projectCapston.freeToGo.entities.Utente;
import projectCapston.freeToGo.repositories.RuoloRepository;
import projectCapston.freeToGo.repositories.UtenteRepository;

import java.util.HashSet;
import java.util.Set;



@Component
@Slf4j
@Order(2)
public class AmdinUserInitializer implements CommandLineRunner {
    @Autowired
    private UtenteRepository utenteRepository;
    @Autowired
    private RuoloRepository ruoloRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Value("${admin.email}")
            private String adminEmail;
    @Value("${admin.password}")
    private  String adminPassword;
    @Value("${admin.username}")
    private String adminUsername;
    @Override
    public void run(String... args) throws Exception {
        log.info("INIZIALIZZAZIONE UTENTE ADMIN");

        if(utenteRepository.findByEmail(adminEmail).isEmpty()){
            log.info("Nessun utente admin trovato,procedo con la creazione");

            Ruolo adminRole = ruoloRepository.findByNome(Ruoli.ADMIN)
                    .orElseThrow(()-> new RuntimeException("ERRORE : Ruolo ADMIN non trovato nel database!"));
            Utente admin = new Utente();
            admin.setNome("Admin");
            admin.setCognome("System");
            admin.setEmail(adminEmail);

            admin.setPassword(passwordEncoder.encode(adminPassword));
            Set<Ruolo> ruoliAdmin = new HashSet<>();
            ruoliAdmin.add(adminRole);
            admin.setRuoli(ruoliAdmin);
            utenteRepository.save(admin);
            log.info ("Utente admin creato con successo  con email: {}", adminEmail);

        }else{
            log.info("utente admin co eamil {} già esistente", adminEmail);
        }
        log.info("FINE ININZIALIZZAIONE UTENTE ADMIN");
    }

}
