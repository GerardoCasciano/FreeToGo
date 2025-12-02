package projectCapston.freeToGo.entities;


import jakarta.persistence.*;
import lombok.*;
import org.hibernate.validator.constraints.URL;
import org.springframework.security.core.GrantedAuthority;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.*;


@Entity
@Getter
@Setter
@Table(name="utenti")
@ToString
@NoArgsConstructor
public class Utente implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    @Column(name = "nome", nullable = false)
    private String nome;
    @Column(name = "cognome", nullable = false)
    private String cognome;
    @Column(name = "email",nullable = false)
    private String email;
    @Column(name = "password", nullable = false)
    private String password;


    @Column(name = "dataCreazione",nullable = false )
    private LocalDateTime dataCreazione;
    @Column(name = "dataUltimaModifica", nullable = false)
    private LocalDateTime dataUltimaModifica;
    @URL
    @Column(name = "avatar_url")
    private String avatarUrl;

    //Metodo per impostare valori per le date e modifica
    @PrePersist
    protected void prePersist() {
        LocalDateTime now = LocalDateTime.now();
        this.dataCreazione = now;
        this.dataUltimaModifica = now;
    }

   // Metodo per aggiornare la data dell'ultima modifica
   @PreUpdate
   protected void preUpdate(){
       this.dataUltimaModifica= LocalDateTime.now();
   }


    @Override
    @com.fasterxml.jackson.annotation.JsonIgnore
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER"));
    }
@Override
    public String getUsername(){
       return this.email;
}
@Override
    public boolean isAccountNonExpired(){
       return true;
}
@Override
    public String getPassword(){
       return this.password;
}
@Override
    public boolean isAccountNonLocked(){
       return true;
}
    public boolean isCredentialsNonExpired(){
       return true;
}
@Override
    public boolean isEnabled(){
       return true;
}
}
