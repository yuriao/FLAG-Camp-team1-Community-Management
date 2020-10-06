package communitymanagement.entity;

import java.util.List;
import java.util.Map;

import communitymanagement.model.Ticket;
import lombok.Data;

@Data
public class TicketForm { 
	private Ticket ticket;
	private List<Map<String, String>> ticketComment;
}