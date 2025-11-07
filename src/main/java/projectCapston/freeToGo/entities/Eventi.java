package projectCapston.freeToGo.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.mapping.Set;
import org.hibernate.validator.constraints.URL;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name = "eventi")
@ToString
@NoArgsConstructor
public class Eventi {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    @Column(name = "titolo", nullable = false)
    private String titolo;

    @Column(name = "descrizione", nullable = false)
    private String descrizione;
    @URL
    @Column(name = "avatar_url")
    private String avatarUrl;
    @Column(name = "data_ora", nullable = false)
    private LocalDateTime dataOra;
    @Column(name = "citta", nullable = false)
    private String citta;
    @Column(name = "latitudine", nullable = false)
    private double latitudine;
    @Column(name = "longitudine", nullable = false)
    private double longitudine; // Corretto l'errore di battitura
    @ManyToOne
    @JoinColumn(name = "utente_id", nullable = false)
   private Utente utente;
@ManyToOne(fetch = FetchType.EAGER)
@JoinColumn(name = "categoria_id",nullable = false)
private Categoria categoria;


    @Column(name="dataCreazione",nullable = false)
    private LocalDateTime dataCreazione;
    @Column(name = "dataUltimaModifica")
    private LocalDateTime dataUltimaModifica;
    @ManyToOne
    @JoinColumn(name = "organizzatore_id", nullable = false)
    private Utente organizzatore;

    public Eventi(String titolo, String categoria, String descrizione, String avatarUrl, LocalDateTime dataOra, String citta, double latitudine, double longitudine, Utente organizzatore, LocalDateTime dataUltimaModifica) {
        this.titolo = titolo;

        this.descrizione = descrizione;
        this.avatarUrl = avatarUrl;
        this.dataOra= dataOra;
        this.citta = citta;
        this.latitudine = latitudine;
        this.longitudine = longitudine;
        this.organizzatore = organizzatore;
        this.dataUltimaModifica=dataUltimaModifica;
    }
}