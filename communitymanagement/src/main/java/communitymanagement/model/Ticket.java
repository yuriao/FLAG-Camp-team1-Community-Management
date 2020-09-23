package communitymanagement.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import java.sql.Timestamp;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(name = "ticket")
public class Ticket implements Serializable {
	private static final long serialVersionUID = 5106014952828648626L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	
	@ManyToOne(fetch=FetchType.EAGER)
	@JoinColumn(name = "user_id")
	private User user;
	
	@Column(name = "unit_number")
	private String unitNumber;
	
	@ManyToOne(fetch=FetchType.EAGER)
	@JoinColumn(name = "issue_category_id")
	private IssueCategory issueCategory;
	
	@Column(name = "subject")
	private String subject;
	
	@Column(name = "description")
	private String description;
	
	@Column(name = "availability")
	private String availability;
	
	@Column(name = "created")
	private Timestamp created;
	
	@Column(name = "updated")
	private Timestamp updated;
	
	@Column(name = "fix_date")
	private Timestamp fixDate;
	
	@Column(name = "priority")
	@Enumerated(EnumType.ORDINAL)
	private TicketPriority priority;
	
	@Column(name = "status")
	@Enumerated(EnumType.ORDINAL)
	private TicketStatus status;
}
