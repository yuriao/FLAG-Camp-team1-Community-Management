package communitymanagement.service;

import java.sql.Timestamp;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired; 
import org.springframework.stereotype.Service;

import communitymanagement.dao.TicketDao;
import communitymanagement.model.Ticket;
import communitymanagement.model.TicketStatus;


@Service
public class TicketService {

	@Autowired
	private TicketDao ticketDao;
	
	public void addTicket(Ticket ticket) {
		ticketDao.addTicket(ticket);
	}

	public Ticket getTicketById(int ticketId) {
		return ticketDao.getTicketById(ticketId);
	}
	
	public void updateTicketStatus(int ticketId, TicketStatus status) {
		Ticket ticket = ticketDao.getTicketById(ticketId);
		if (ticket != null) {
			ticket.setStatus(status);
			ticketDao.addTicket(ticket);
		}
	}
	
	public void updateTicketUpdatedDate(int ticketId, Timestamp updateTime) {
		Ticket ticket = ticketDao.getTicketById(ticketId);
		if (ticket != null) {
			ticket.setUpdated(updateTime);
			ticketDao.addTicket(ticket);
		}
	}
	
	public void updateTicketFixDate(int ticketId, Timestamp fixTime) {
		Ticket ticket = ticketDao.getTicketById(ticketId);
		if (ticket != null) {
			ticket.setFixDate(fixTime);
			ticketDao.addTicket(ticket);
		}
	}
	
	public List<Ticket> getTicketsByUser(int userId) {
		return ticketDao.getAllTicketsByUserId(userId);
	}

	public List<Ticket> getAllTickets() {
		return ticketDao.getAllTickets();
	}

	public List<Ticket> getTicketsByUserIdWithTimeRange(int userId, Timestamp start, Timestamp end) {
		return ticketDao.getTicketsByUserIdWithTimeRange(userId, start, end);
	}
}
