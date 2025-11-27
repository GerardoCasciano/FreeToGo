package projectCapston.freeToGo.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import org.hibernate.validator.constraints.URL;


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
    @Column(name = "avatar_url")
    private String avatarUrl;
    @Column(name = "data_ora", nullable = false)
    private LocalDateTime dataOra;
    @Column(name = "citta", nullable = false)
    private String citta;
    @Column(name = "via")
    private String via;
    @Column(name = "regione")
    private String regione;
    @Column(name = "latitudine", nullable = false)
    private double latitudine;
    @Column(name = "longitudine", nullable = false)
    private double longitudine;
    @Column(name = "prezzo")
    private Double prezzo;
    @ManyToOne
    @JoinColumn(name = "utente_id", nullable = false)
   private Utente utente;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "tipo_evento_id", nullable = false)
    private TipoDiEvento tipoEvento;

    @ManyToOne
    @JoinColumn(name = "categoria_id", nullable = false)
    private Categoria categoria;


    @Column(name = "dataCreazione", nullable = false)
    private LocalDateTime dataCreazione;
    @Column(name = "dataUltimaModifica")
    private LocalDateTime dataUltimaModifica;

    @ManyToOne
    @JoinColumn(name = "organizzatore_id", nullable = false)
    private Utente organizzatore;
}