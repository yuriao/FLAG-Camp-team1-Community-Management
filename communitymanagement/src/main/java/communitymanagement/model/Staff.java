package communitymanagement.model;


import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;


@Entity
@Table(name = "staff")
@Setter
@Getter
public class Staff implements Serializable {

    private static final long serialVersionUID = 154078219596259408L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @OneToOne
    private User user;

    @ManyToOne
    private StaffCategory staffCategory;
}
