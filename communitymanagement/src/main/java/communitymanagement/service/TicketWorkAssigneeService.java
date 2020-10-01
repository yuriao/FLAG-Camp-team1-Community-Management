package communitymanagement.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import communitymanagement.dao.TicketWorkAssigneeDao;
import communitymanagement.entity.AssigneeRawData;
import communitymanagement.model.TicketWorkAssignee;

@Service
public class TicketWorkAssigneeService {

	@Autowired
	private TicketWorkAssigneeDao ticketWorkAssigneeDao;

	public void addTickeWorkAssignee(TicketWorkAssignee ticketWorkAssignee) {
		ticketWorkAssigneeDao.addTickeWorkAssignee(ticketWorkAssignee);
	}

	public void deleteTickeWorkAssigneeById(int ticketWorkAssigneeId) {
		ticketWorkAssigneeDao.deleteTickeWorkAssigneeById(ticketWorkAssigneeId);
	}

	public List<TicketWorkAssignee> getAllTicketWorkAssineeByTicketId(int ticketId) {
		return ticketWorkAssigneeDao.getAllTicketWorkAssineeByTicketId(ticketId);
	}

	public List<TicketWorkAssignee> getAllTicketWorkAssineeByUserId(int userId) {
		return ticketWorkAssigneeDao.getAllTicketWorkAssineeByUserId(userId);
	}
	
	public List<AssigneeRawData> getAllPossibleStaffRecommendation() {
		return ticketWorkAssigneeDao.getAllPossibleStaffRecommendation();
	}
	
	public List<AssigneeRawData> getAllExistingAssignment() {
		return ticketWorkAssigneeDao.getAllExistingAssignment();
	}
}