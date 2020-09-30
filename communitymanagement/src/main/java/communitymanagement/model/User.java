package communitymanagement.model;

import java.io.Serializable;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "user", uniqueConstraints = {@UniqueConstraint(columnNames = "username")})
@Setter
@Getter
public class User implements Serializable {

	private static final long serialVersionUID = -2454867938054036364L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;

	@Enumerated(EnumType.STRING)
	@Column(name = "user_type")
	private UserType userType;

	@Column(name = "first_name")
	private String firstName;

	@Column(name = "last_name")
	private String lastName;

	// user name is the email address
	@Column(name = "username")
	private String username;

	private String password;

	@Column(name = "phone_number")
	private String phoneNumber;

	private boolean enabled;

	@OneToOne(optional = true, cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "user")
	private Manager manager;

	@OneToOne(optional = true, cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "user")
	private Resident resident;

	@OneToOne(optional = true, cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "user")
	private Staff staff;

	@OneToMany(mappedBy = "user")
	private List<Ticket> ticket;

	@OneToMany(mappedBy = "user")
	private List<TicketWorkAssignee> ticketWorkAssignee;

	@OneToMany(mappedBy = "user")
	private List<TicketComment> ticketComment;
}
