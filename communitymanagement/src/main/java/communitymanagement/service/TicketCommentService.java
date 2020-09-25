package communitymanagement.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import communitymanagement.dao.TicketCommentDao;
import communitymanagement.model.TicketComment;
import communitymanagement.model.Ticket;

@Service
public class TicketCommentService {
	
	@Autowired
	private TicketCommentDao ticketCommentDao;
	
	public void addTicketComment(TicketComment ticketComment) {
		ticketCommentDao.addTicketComment(ticketComment);
	}
	
	public List<TicketComment> getAllTicketComments(Ticket ticket) {
		return ticketCommentDao.getAllTicketComments(ticket);
	}
	
}