package communitymanagement.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "resident")
@Setter
@Getter
public class Resident implements Serializable {

    private static final long serialVersionUID = 9026229229061582805L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @OneToOne
    private User user;

    @Column(name = "unit_num")
    private String unitNum;

    @Column(name = "birthday")
    @Temporal(TemporalType.DATE)
    private Date birthday;
}

