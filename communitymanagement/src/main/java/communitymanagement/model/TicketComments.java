package communitymanagement.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;


@Entity
@Table(name="ticket_comments")
@Setter
@Getter
public class TicketComments implements Serializable {
	private static final long serialVersionUID = -2455760938564036364L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	
	@ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
	
	@ManyToOne
    @JoinColumn(name = "ticket_id")
    private Ticket ticket;
	
	@Column(name = "body")
	private String body;
	
	@Column(name = "created")
	private Timestamp created;

}
