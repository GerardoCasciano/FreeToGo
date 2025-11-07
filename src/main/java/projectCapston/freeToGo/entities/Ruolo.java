package projectCapston.freeToGo.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name = "ruoli")
@ToString
@NoArgsConstructor
public class Ruolo {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Enumerated(EnumType.STRING)
    @Column(name = "nome")
    private Ruoli nome;

    @ManyToMany(mappedBy = "ruoli",fetch = FetchType.LAZY)
    @ToString.Exclude
    @JsonIgnore
   private Set<Utente> utenti=new HashSet<>();




    public Ruolo(Ruoli nome) {
        this.nome = nome;
    }


}