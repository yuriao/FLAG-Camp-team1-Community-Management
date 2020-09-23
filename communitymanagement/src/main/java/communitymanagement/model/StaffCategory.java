package communitymanagement.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "staff_category")
@Setter
@Getter
public class StaffCategory implements Serializable {

    private static final long serialVersionUID = -5732817552637041373L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @Column(name = "category")
    private String staffCategory;
}
