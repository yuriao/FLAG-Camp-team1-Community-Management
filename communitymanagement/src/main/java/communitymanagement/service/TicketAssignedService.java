package communitymanagement.service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import communitymanagement.dao.ResidentDao;
import communitymanagement.dao.TicketDao;
import communitymanagement.dao.UserDao;
import communitymanagement.entity.TicketAssigned;
import communitymanagement.model.Resident;
import communitymanagement.model.Ticket;
import communitymanagement.model.User;

@Service
public class TicketAssignedService {
	
	@Autowired
	private TicketDao ticketDao;
	
	@Autowired
	private ResidentDao residentDao;
	
	@Autowired
	private Resident resident;
	
	@Autowired
	private User user;
	
	@Autowired
	private UserDao userDao;

	public List<TicketAssigned> getTicketAssignedByUserId (int userId) {
		List<TicketAssigned> ticketAssignedList = new ArrayList<TicketAssigned>();
		List<Ticket> ticketList = new ArrayList<Ticket>();
		ticketList = ticketDao.getAllTicketsByUserId(userId);
		user = userDao.getUserByUserId(userId);
		resident = residentDao.getResidentByUserName(user.getUserName());
		for (Ticket ticket : ticketList) {
			TicketAssigned ticketAssigned = new TicketAssigned();
			ticketAssigned.setTicketId(ticket.getId());
			ticketAssigned.setUnitNumber(resident.getUnitNum());
			ticketAssigned.setSubmittedDate(ticket.getCreated());
			ticketAssigned.setIssue(ticket.getIssueCategory().getIssue());
			ticketAssignedList.add(ticketAssigned);
		}
		return ticketAssignedList;
	} 
}
