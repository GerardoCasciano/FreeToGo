package projectCapston.freeToGo.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import org.stringtemplate.v4.ST;

import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "tipiEvento")
@Getter
@Setter
@NoArgsConstructor
public class TipoDiEvento {



    @Id
    @GeneratedValue(generator = "uuid")
    @JdbcTypeCode(SqlTypes.UUID)
    private UUID id;

    @Column(nullable = false, unique = true)
    private String nome;

    @ManyToOne
    @JoinColumn(name = "categoria_id", nullable = false)
    private Categoria categoria;

    @OneToMany(mappedBy = "tipoEvento", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Eventi> eventi;
}
