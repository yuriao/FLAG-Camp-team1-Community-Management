package communitymanagement.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import communitymanagement.dao.LocationDao;
import communitymanagement.entity.TicketAssigned;
import communitymanagement.model.Issue;
import communitymanagement.model.IssueCategory;
import communitymanagement.model.Location;
import communitymanagement.model.Staff;
import communitymanagement.model.Ticket;
import communitymanagement.model.User;
import communitymanagement.model.LocationEnum;
import communitymanagement.model.IssueEnum;
import communitymanagement.service.TicketAssignedService;
import communitymanagement.service.TicketService;

import java.util.ArrayList;
import java.util.EnumSet;
import java.util.List;

@RestController
public class TicketIssueController {
	
	@Autowired
	private TicketAssignedService ticketAssignedService;
	
	@Autowired
	private LocationEnum locationEnum;
	
	@Autowired
	private IssueEnum issueEnum;
	
	@GetMapping("/tickets/staff")
	public List<TicketAssigned> getTickets(@RequestParam(value = "user_id", defaultValue = "") int userId) {
		return ticketAssignedService.getTicketAssignedByUserId(userId);
	}

	@GetMapping("/ticket-issue-categories")
	public List<Enum> allIssueLocationCategory() {
		List<Enum> allIssueLocationCategory = new ArrayList<Enum>();
		allIssueLocationCategory.add(locationEnum);
		allIssueLocationCategory.add(issueEnum);
		return allIssueLocationCategory;
	}
}
