package communitymanagement.model;

import java.io.Serializable;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import javax.persistence.JoinColumn;

@Entity
@Table(name = "issue")
@Setter
@Getter
public class Issue implements Serializable {
	
	private static final long serialVersionUID = -2455867938054036364L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	
	@Column(name = "issue_type")
	private String issueType;

	@OneToMany(mappedBy = "issue", cascade = CascadeType.ALL)
	private List<WorkAssignment> workAssignments;
}
