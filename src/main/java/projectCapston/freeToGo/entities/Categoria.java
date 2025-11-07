package projectCapston.freeToGo.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import org.hibernate.type.descriptor.jdbc.SqlTypedJdbcType;

import java.util.UUID;

@Entity
@Table(name = "categoria")
@Getter
@Setter
@ToString
@NoArgsConstructor
public class Categoria {
    @Id
    @GeneratedValue(generator = "uuid")
    @JdbcTypeCode(SqlTypes.UUID)
    private UUID id;
    @Column(nullable = false,unique = true,length = 50)
    private String nome;
    @Column(name = "descrizione",nullable = false,length = 100)
    private  String descrizione;
}
