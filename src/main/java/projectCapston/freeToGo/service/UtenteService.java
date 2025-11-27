package projectCapston.freeToGo.service;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import projectCapston.freeToGo.entities.Utente;
import projectCapston.freeToGo.exceptions.NotFoundException;
import projectCapston.freeToGo.exceptions.UtenteEsistenteException;
import projectCapston.freeToGo.payload.AuthResponseDTO;
import projectCapston.freeToGo.payload.LoginRequestDTO;
import projectCapston.freeToGo.payload.RegistroRequestDTO;
import projectCapston.freeToGo.payload.UtenteDTO;
import projectCapston.freeToGo.repositories.UtenteRepository;
import projectCapston.freeToGo.security.JWTTools;
import org.springframework.context.annotation.Lazy;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import com.cloudinary.Cloudinary;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import com.cloudinary.utils.ObjectUtils;

@Service
public class UtenteService implements UserDetailsService {
    @Autowired
    private UtenteRepository utenteRepository;
    @Autowired
    private Cloudinary cloudinary;
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

    public Utente uploadAvatar(UUID id, MultipartFile file) throws IOException{
        Utente utente = utenteRepository.findById(id).orElseThrow(()->new NotFoundException("Utente con Id" + id + "non trovato."));
        String avatarUrl = (String) cloudinary.uploader().upload(file.getBytes(),ObjectUtils.emptyMap()).get("url");
        utente.setAvatarUrl(avatarUrl);
        return utenteRepository.save(utente);
    }

    public AuthResponseDTO login(LoginRequestDTO loginRequest) {
        UserDetails userDetails = loadUserByUsername(loginRequest.email());

        if (passwordEncoder.matches(loginRequest.password(), userDetails.getPassword())) {
            Utente utente = utenteRepository.findByEmail(loginRequest.email()).get();
            String token = jwtTools.createToken(utente);
            // Since roles are removed, we can hardcode this or fetch a default role if needed.
            String ruoli = "ROLE_USER"; 

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
        //Creo Utente
        Utente nuovoUtente = new Utente();
        nuovoUtente.setNome(request.nome());
        nuovoUtente.setCognome(request.cognome());
        nuovoUtente.setEmail(request.email());
        //Hashing della password
        String hashedPassword = passwordEncoder.encode((request.password()));
        nuovoUtente.setPassword(hashedPassword);

        return utenteRepository.save(nuovoUtente);
    }

    //Cerco tramite email
    public Utente findByEmail(String email){
        return this.utenteRepository.findByEmail(email).orElseThrow(()->
                new NotFoundException("L'utente con l'email " + email +" non è stato trovato ."));
    }

    //Metodo Upadate aggiorna i dettagli di un utente
    @Transactional
    public Utente update(UUID id, Utente utenteDetails) {
        Utente utenteEsistente = utenteRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Utente con ID " + id + " non trovato."));

        utenteEsistente.setNome(utenteDetails.getNome());
        utenteEsistente.setCognome(utenteDetails.getCognome());
        utenteEsistente.setEmail(utenteDetails.getEmail());


        return utenteRepository.save(utenteEsistente);
    }

    //Metodo per dimostrare l'accesso ai dati (tutti possono vedere tutti)
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
                        utente.getPassword(),
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
}
