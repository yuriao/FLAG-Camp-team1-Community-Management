package communitymanagement.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
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

