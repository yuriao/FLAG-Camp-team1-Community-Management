package communitymanagement.controller;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import communitymanagement.entity.AssigneeEntity;
import communitymanagement.entity.AssigneeForm;
import communitymanagement.entity.ManagerTicketOverview;
import communitymanagement.entity.ManagerTicketSystemResponse;
import communitymanagement.entity.TicketOverview;
import communitymanagement.entity.TicketSubmitForm;
import communitymanagement.entity.TicketsResident;
import communitymanagement.model.Ticket;
import communitymanagement.model.TicketStatus;
import communitymanagement.model.TicketWorkAssignee;
import communitymanagement.model.User;
import communitymanagement.model.UserType;
import communitymanagement.service.IssueCategoryService;
import communitymanagement.service.TicketService;
import communitymanagement.service.TicketWorkAssigneeService;
import communitymanagement.service.UserService;
import communitymanagement.servicefacade.AssigneeRecommendationFacadeImpl;

@RestController
public class TicketController {

	@Autowired
	private TicketService ticketService;

	@Autowired
	private UserService userService;

	@Autowired
	private IssueCategoryService issueCategoryService;

	@Autowired
	private TicketWorkAssigneeService ticketWorkAssigneeService;

	@Autowired
	private AssigneeRecommendationFacadeImpl assigneeRecommendationFacadeImpl;

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
	
	@PostMapping("/tickets/{ticket_id}/staff-action")
	public ResponseEntity<String> ticketStatusChangedByStaffAction(
			@PathVariable(value = "ticket_id") int ticketId, @RequestBody Map<String, String> reqBody) {
		// Get ticket
		Ticket ticket = ticketService.getTicketById(ticketId);
		if (ticket == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Ticket with id " + ticketId + " not found!");
		}

		// Change status
		String action = reqBody.get("action");
		try {
			if (action.equals("accept")) {
				ticketService.updateTicketStatus(ticketId, TicketStatus.INPROGRESS);
				return ResponseEntity.status(HttpStatus.ACCEPTED).body("Staff accepted: ticket is in progress now");
			} else if (action.equals("decline")) {
				ticketService.updateTicketStatus(ticketId, TicketStatus.OPEN);

				// Remove all (MVP should only have one) related assignee if staff declined
				List<TicketWorkAssignee> allAssignee = ticketWorkAssigneeService.getAllTicketWorkAssineeByTicketId(ticketId);
				for (TicketWorkAssignee assignee : allAssignee) {
					ticketWorkAssigneeService.deleteTickeWorkAssigneeById(assignee.getId());
				}

				return ResponseEntity.status(HttpStatus.ACCEPTED).body("Staff declined: reopen ticket");
			} else if (action.equals("complete")) {
				ticketService.updateTicketStatus(ticketId, TicketStatus.COMPLETE);
				return ResponseEntity.status(HttpStatus.ACCEPTED).body("Staff completed: ticket is completed now");
			} else {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Action not acceptable: " + action);
			}
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.toString());
		}
	}
      
	@GetMapping("/tickets/manager")
	public ManagerTicketSystemResponse getManagerTicketSystem() {
		// get user
		// Authentication loggedInUser =
		// SecurityContextHolder.getContext().getAuthentication();
		// User user = (User)loggedInUser.getPrincipal();
		// int userId = user.getId();

		int userId = 68;
		User user = userService.getUserByUserId(userId);

		List<Ticket> tickets = ticketService.getAllTickets();

		// build response
		List<ManagerTicketOverview> managerTicketOverviews = new ArrayList<>();
		for (Ticket ticket : tickets) {

			List<AssigneeEntity> existAssignees = new ArrayList<>();
			List<AssigneeEntity> recommendAssignees = new ArrayList<>();

			// find existing assignees
			List<TicketWorkAssignee> ticketWorkAssignees = ticketWorkAssigneeService
					.getAllTicketWorkAssineeByTicketId(ticket.getId());

			if (ticketWorkAssignees.size() == 0) {
				existAssignees = null;
			} else {
				for (TicketWorkAssignee twa : ticketWorkAssignees) {
					User existAssigneeUser = twa.getUser();
					AssigneeEntity existAssignee = AssigneeEntity.builder()
							.name(existAssigneeUser.getFirstName() + " " + existAssigneeUser.getLastName())
							.userId(existAssigneeUser.getId()).build();
					existAssignees.add(existAssignee);
				}
			}

			// recommend assignees if existing assignees do not exist
			if (existAssignees != null) {
				recommendAssignees = null;
			} else {
				recommendAssignees = assigneeRecommendationFacadeImpl
						.getTicketAssineeRecommendation(ticket.getIssueCategory().getId());
			}

			ManagerTicketOverview managerTicketOverview = ManagerTicketOverview.builder().ticketId(ticket.getId())
					.submittedDate(ticket.getCreated()).issue(ticket.getIssueCategory().getIssue().getIssueType())
					.assignees(existAssignees).recommendStaff(recommendAssignees).build();
			managerTicketOverviews.add(managerTicketOverview);
		}

		ManagerTicketSystemResponse response = ManagerTicketSystemResponse.builder().tickets(managerTicketOverviews)
				.phone(user.getPhoneNumber()).email(user.getUserName())
				.user_name(user.getFirstName() + " " + user.getLastName()).build();
		return response;
	}

	@PutMapping("/tickets/{ticket_id}/assignees")
	public ResponseEntity<String> assignAssignee(@RequestBody AssigneeForm form,
			@PathVariable("ticket_id") int ticketId, BindingResult result) {
		if (result.hasErrors()) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Cannot resolve input request");
		}

		try {
			// get user
			// Authentication loggedInUser =
			// SecurityContextHolder.getContext().getAuthentication();
			// User user = (User)loggedInUser.getPrincipal();
			// int userId = user.getId();
			int userId = 68;

			// only manager can do assignment
			User user = userService.getUserByUserId(userId);
			if (user.getUserType() != UserType.MANAGER) {
				return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Only MANAGER can assign job");
			}

			Ticket ticket = ticketService.getTicketById(ticketId);

			for (int theId : form.getAssignees()) {
				User assignee = userService.getUserByUserId(theId);
				TicketWorkAssignee ticketWorkAssignee = new TicketWorkAssignee();
				ticketWorkAssignee.setTicket(ticket);
				ticketWorkAssignee.setUser(assignee);
				ticketWorkAssigneeService.addTickeWorkAssignee(ticketWorkAssignee);
			}
			// update ticket status
			ticket.setStatus(TicketStatus.ASSINGED);
			ticketService.addTicket(ticket);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.toString());
		}
		return ResponseEntity.status(HttpStatus.OK).body("Ticket Assigned");
	}

}
