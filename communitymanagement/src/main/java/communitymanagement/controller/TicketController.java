package communitymanagement.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import communitymanagement.entity.TicketOverview;
import communitymanagement.entity.TicketSubmitForm;
import communitymanagement.entity.TicketsResident;
import communitymanagement.model.Ticket;
import communitymanagement.model.TicketStatus;
import communitymanagement.model.User;
import communitymanagement.service.IssueCategoryService;
import communitymanagement.service.TicketService;
import communitymanagement.service.UserService;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;


@RestController
public class TicketController {
	
	@Autowired
	private TicketService ticketService;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private IssueCategoryService issueCategoryService;
	
	@PostMapping("/tickets/submit")
	public ResponseEntity<String> saveIssueCategory(@RequestBody TicketSubmitForm ticketForm) {
		try {
			// Create a new ticket
			Ticket ticket = new Ticket();
			ticket.setUser(userService.getUserByUserId(ticketForm.getUserId()));
			ticket.setUnitNumber(ticketForm.getUnitNumber());
			ticket.setIssueCategory(issueCategoryService.getIssueCategoryById(ticketForm.getIssueCategoryId()));
			ticket.setSubject(ticketForm.getSubject());
			ticket.setDescription(ticketForm.getDescription());
			ticket.setAvailability(ticketForm.getAvailability());
			ticket.setPriority(ticketForm.getPriority());
			
			// Set time
			Date date = new Date();
			Timestamp curTime = new Timestamp(date.getTime());
			ticket.setCreated(curTime);
			ticket.setUpdated(curTime);
			
			// Set status -- new created tickets should be open status
			ticket.setStatus(TicketStatus.OPEN);
			
			// Save the ticket
			ticketService.addTicket(ticket);
			return ResponseEntity.status(HttpStatus.CREATED).body(ticket.toString());
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.toString());
		}
	}
	
	@GetMapping("/tickets/resident")
	public TicketsResident getResidentTickets(@RequestParam(value = "user") int userId) {
		User user = userService.getUserByUserId(userId);
		List<Ticket> tickets = ticketService.getTicketsByUser(userId);
		String unitNumber = null;
		
		// Construct
		List<TicketOverview> ticketsOverview = new ArrayList<>();
		for (Ticket ticket : tickets) {
			TicketOverview overview = new TicketOverview();
			overview.setTicketId(ticket.getId());
			overview.setSubject(ticket.getSubject());
			overview.setStatus(ticket.getStatus());
			overview.setFixDate(ticket.getFixDate());
			if (ticket.getStatus() == TicketStatus.COMPLETE) {
				overview.setCompleteDate(ticket.getUpdated());
			}
			if (unitNumber == null && ticket.getUnitNumber() != null) {
				unitNumber = ticket.getUnitNumber();
			}
			ticketsOverview.add(overview);
		}
		
		TicketsResident ticketsResident = new TicketsResident();
		ticketsResident.setTickets(ticketsOverview);
		ticketsResident.setUserName(user.getUserName());
		ticketsResident.setPhone(user.getPhoneNumber());
		ticketsResident.setUnitNumber(unitNumber);
		ticketsResident.setEmail(user.getUserName());
		return ticketsResident;
	}
	
}
