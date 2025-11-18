package projectCapston.freeToGo.service;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import projectCapston.freeToGo.entities.Ruoli;
import projectCapston.freeToGo.entities.Ruolo;
import projectCapston.freeToGo.entities.Utente;
import projectCapston.freeToGo.exceptions.NotFoundException;
import projectCapston.freeToGo.exceptions.UtenteEsistenteException;
import projectCapston.freeToGo.payload.AuthResponseDTO;
import projectCapston.freeToGo.payload.LoginRequestDTO;
import projectCapston.freeToGo.payload.RegistroRequestDTO;
import projectCapston.freeToGo.payload.UtenteDTO;
import projectCapston.freeToGo.repositories.RuoloRepository;
import projectCapston.freeToGo.repositories.UtenteRepository;
import projectCapston.freeToGo.security.JWTTools;
import org.springframework.context.annotation.Lazy;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class UtenteService implements UserDetailsService {
    @Autowired
    private UtenteRepository utenteRepository;
    @Autowired
    private RuoloRepository ruoloRepository;
    @Autowired
    @Lazy
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JWTTools jwtTools;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return utenteRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Utente non trovato con email: " + email));
    }

    public AuthResponseDTO login(LoginRequestDTO loginRequest) {
        UserDetails userDetails = loadUserByUsername(loginRequest.email());

        if (passwordEncoder.matches(loginRequest.password(), userDetails.getPassword())) {
            Utente utente = utenteRepository.findByEmail(loginRequest.email()).get();
            String token = jwtTools.createToken(utente);
            String ruoli = utente.getAuthorities().stream()
                    .map(GrantedAuthority::getAuthority)
                    .collect(Collectors.joining(", "));

            return new AuthResponseDTO(utente.getId(),token, utente.getNome(), utente.getCognome(), ruoli);
        } else {
            throw new RuntimeException("Credenziali non valide");
        }
    }

    @Transactional
    public Utente registerUser(RegistroRequestDTO request){
        //Verifico esistenza utente
        if(utenteRepository.existsByEmail(request.email())){
            throw new UtenteEsistenteException("L'email è già in uso: " + request.email());
        }
        //Recupero il ruolo USER dal DB
        Ruolo userRuolo=ruoloRepository.findByNome(Ruoli.USER)
                .orElseThrow(()->new NotFoundException("Ruolo USER non trovato nel DB, assicurarsi sia stato inizializzato."));
//Creo Utente
        Utente nuovoUtente = new Utente();
        nuovoUtente.setNome(request.nome());
        nuovoUtente.setCognome(request.cognome());
        nuovoUtente.setEmail(request.email());
        //Hashing della password
        String hashedPassword = passwordEncoder.encode((request.password()));
        nuovoUtente.setPassword(hashedPassword);

        //Assegnazione ruolo (USER)
        nuovoUtente.getRuoli().add(userRuolo);

        return utenteRepository.save(nuovoUtente);
    }


    @Transactional
    public Utente registerAdmin(RegistroRequestDTO request){
        //Verifico esistenza utente
        if(utenteRepository.existsByEmail(request.email())){
            throw new UtenteEsistenteException("L'email è già in uso: " + request.email());
        }
        //Recupero il ruolo ADMIN dal DB
        Ruolo adminRuolo = ruoloRepository.findByNome(Ruoli.ADMIN)
                .orElseThrow(()->new NotFoundException("Ruolo ADMIN non trovato nel DB, assicurarsi sia stato inizializzato."));
//Creo Utente
        Utente nuovoUtente = new Utente();
        nuovoUtente.setNome(request.nome());
        nuovoUtente.setCognome(request.cognome());
        nuovoUtente.setEmail(request.email());
        //Hashing della password
        String hashedPassword = passwordEncoder.encode((request.password()));
        nuovoUtente.setPassword(hashedPassword);

        //Assegnazione ruolo (ADMIN)
        nuovoUtente.getRuoli().add(adminRuolo);

        return utenteRepository.save(nuovoUtente);
    }


    @Transactional
    public Utente assegnaRuolo(UUID utenteId, String nomeRuolo) {
        Utente utente = findById(utenteId);
//Recupero il ruolo dal DB ,anzichè creare uno nuovo
        Ruolo ruolo = ruoloRepository.findByNome(projectCapston.freeToGo.entities.Ruoli.valueOf(nomeRuolo))
                .orElseThrow(()->new NotFoundException("Ruolo " + nomeRuolo + " non trovato nel DB."));
        utente.getRuoli().add(ruolo);
        return utenteRepository.save(utente);
    }
    //Cerco tramite email
    public Utente findByEmail(String email){
        return this.utenteRepository.findByEmail(email).orElseThrow(()->
                new NotFoundException("L'utente con l'email " + email +" non è stato trovato ."));
    }
//Metodo :Promuove o retrocede un utente
    public Utente updateRole(UUID id,Ruoli nuovoRuolo){
        Utente utente = utenteRepository.findById(id)
                .orElseThrow(()-> new NotFoundException("Utente con ID" + "non trovato."));

        //Recupero il Ruolo dal DB in base al nome dell'Ennum
        projectCapston.freeToGo.entities.Ruolo ruoloDaAssegnare = ruoloRepository.findByNome(nuovoRuolo)
                .orElseThrow(()-> new IllegalArgumentException("Ruolo" + nuovoRuolo + "non trovato nel DB"));
                //Sostituise set di ruoli con il nuovo ruolo singolo
                utente.setRuoli(Set.of(ruoloDaAssegnare));
                return utenteRepository.save(utente);
            }
        //Metodo Upadate aggiorna i dettagli di un utente
            @Transactional
            public Utente update(UUID id, Utente utenteDetails) {
                Utente utenteEsistente = utenteRepository.findById(id)
                        .orElseThrow(() -> new NotFoundException("Utente con ID " + id + " non trovato."));
        
                utenteEsistente.setNome(utenteDetails.getNome());
                utenteEsistente.setCognome(utenteDetails.getCognome());
                utenteEsistente.setEmail(utenteDetails.getEmail());
                // Non aggiorniamo la password qui, dovrebbe essere un metodo separato per sicurezza
                // utenteEsistente.setPassword(passwordEncoder.encode(utenteDetails.getPassword()));
        
                return utenteRepository.save(utenteEsistente);
            }
        
        //Metodo per dimostrare l'accesso ai dati (solo ADMIN può vedere tutti)
            public List<Utente> findAll(){
                return utenteRepository.findAll();
            }
    //Cerco tramite ID
    public Utente findById(UUID id){
        return this.utenteRepository.findById(id).orElseThrow(()->
                new NotFoundException("L'utente con id " + id + " non è stato trovato."));
    }

    public List<UtenteDTO> getAllUtenti() {
        return utenteRepository.findAll().stream()
                .map(utente -> new UtenteDTO(
                        utente.getId(),
                        utente.getNome(),
                        utente.getEmail(),
                        utente.getPassword(), // Consider if password should be exposed in DTO
                        utente.getDataCreazione(),
                        utente.getDataUltimaModifica(),
                        utente.getAvatarUrl()
                ))
                .collect(Collectors.toList());
    }
    //Elimina utente per Id
    public void deleteById(UUID id){
        findById(id);
        utenteRepository.deleteById(id);

    }
    //Elimina solo per ADMIN
    public void deleteUserByAdmin(UUID userId){
        findById(userId);
        utenteRepository.deleteById(userId);
    }
}
