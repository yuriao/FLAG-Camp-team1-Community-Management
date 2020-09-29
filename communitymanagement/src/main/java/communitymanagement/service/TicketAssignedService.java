package communitymanagement.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import communitymanagement.dao.TicketDao;
import communitymanagement.entity.TicketAssigned;
import communitymanagement.model.Ticket;

@Service
public class TicketAssignedService {
	
	@Autowired
	private TicketDao ticketDao;

	public List<TicketAssigned> getTicketAssignedByUserId (int userId) {
		List<TicketAssigned> ticketAssignedList = new ArrayList<TicketAssigned>();
		List<Ticket> ticketList = new ArrayList<Ticket>();
		ticketList = ticketDao.getAllTicketsByUserId(userId);
		for (Ticket ticket : ticketList) {
			TicketAssigned ticketAssigned = new TicketAssigned();
			ticketAssigned.setTicketId(ticket.getId());
			ticketAssigned.setUnitNumber(ticket.getUnitNumber());
			ticketAssigned.setSubmittedDate(ticket.getCreated());
			ticketAssigned.setIssue(ticket.getIssueCategory().getIssue());
			ticketAssignedList.add(ticketAssigned);
		}
		return ticketAssignedList;
	} 
}
