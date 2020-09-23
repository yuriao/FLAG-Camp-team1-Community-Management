package communitymanagement.model;


import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "manager")
@Setter
@Getter
public class Manager implements Serializable {

    private static final long serialVersionUID = -3637231922902620347L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @OneToOne
    private User user;
}
