package communitymanagement.model;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.JoinColumn;


@Entity
@Table(name="TicketWorkASsignee")
@Setter
@Getter
public class TicketWorkAssignee implements Serializable{

	private static final long serialVersionUID = -2455867938054036364L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	
	@ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
	
	@ManyToOne
    @JoinColumn(name = "ticket_id")
    private Ticket ticket;
}
