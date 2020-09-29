package communitymanagement.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import communitymanagement.entity.TicketAssigned;
import communitymanagement.service.TicketAssignedService;

import java.util.List;

@RestController
public class TicketIssueController {
	
	@Autowired
	private TicketAssignedService ticketAssignedService;
	
	@GetMapping("/tickets/staff")
	public List<TicketAssigned> getTickets(@RequestParam(value = "user_id", defaultValue = "") int userId) {
		return ticketAssignedService.getTicketAssignedByUserId(userId);
	}

	@GetMapping("/ticket-issue-categories")
	public List<Enum> allIssueLocationCategory() {
		return null;
	}
}
