package communitymanagement.entity;

import java.util.List;

import communitymanagement.model.Ticket;
import communitymanagement.model.TicketComment;
import lombok.Data;

@Data
public class TicketForm { 
	private Ticket ticket;
	private List<TicketComment> ticketComment;
}