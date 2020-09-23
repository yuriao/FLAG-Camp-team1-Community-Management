package communitymanagement.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "work_assignment")
@Setter
@Getter
public class WorkAssignment implements Serializable {

    private static final long serialVersionUID = 6417750263110548882L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @ManyToOne
    private StaffCategory staffCategory;

    @ManyToOne
    private Issue issue;
}

