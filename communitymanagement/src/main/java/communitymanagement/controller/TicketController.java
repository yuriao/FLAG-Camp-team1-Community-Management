package communitymanagement.controller;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.Enumeration;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import communitymanagement.entity.AssigneeForm;
import communitymanagement.entity.ManagerTicketOverview;
import communitymanagement.entity.ManagerTicketSystemResponse;
import communitymanagement.entity.TicketOverview;
import communitymanagement.entity.TicketSubmitForm;
import communitymanagement.entity.TicketsResident;
import communitymanagement.entity.UserForm;
import communitymanagement.model.Ticket;
import communitymanagement.model.TicketStatus;
import communitymanagement.model.TicketWorkAssignee;
import communitymanagement.model.User;
import communitymanagement.model.UserType;
import communitymanagement.service.IssueCategoryService;
import communitymanagement.service.TicketService;
import communitymanagement.service.TicketWorkAssigneeService;
import communitymanagement.service.UserService;
import communitymanagement.servicefacade.ManagerTicketOverviewFacadeImpl;

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
	private ManagerTicketOverviewFacadeImpl managerTicketOverviewFacadeImpl;

	@CrossOrigin(origins = "http://localhost:3000") // handle CORS error 011022
	@PostMapping("/tickets/submit")
	public ResponseEntity<String> saveIssueCategory(@RequestBody TicketSubmitForm ticketForm,
			HttpServletRequest request) {
		try {
			// get user info from session
			//HttpSession session = request.getSession(false);
			//HttpSession session = request.getSession();
			//if (session == null) {
			//	return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
			//}
			//int userId = Integer.parseInt(session.getAttribute("userId").toString());
			System.out.println(ticketForm);
			int userId =Integer.parseInt(ticketForm.getUserId());
			// Create a new ticket
			Ticket ticket = new Ticket();
			ticket.setUser(userService.getUserByUserId(userId));
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

	@CrossOrigin(origins = "http://localhost:3000") // handle CORS error 011022
	@GetMapping("/tickets/resident")
	public ResponseEntity<TicketsResident> getResidentTickets(HttpServletRequest request) {
		// get user info from session
		//HttpSession session = request.getSession(false);
		//if (session == null) {
		//	return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
		//}
		
		Enumeration<String> headerNames = request.getHeaderNames();
		while(headerNames.hasMoreElements()) {
			String headerName = headerNames.nextElement();
			System.out.println("Header Name - " + headerName + ", Value - " + request.getHeader(headerName));
		}
		
		int userId = Integer.parseInt(request.getHeader("userid"));//Integer.parseInt(session.getAttribute("userId").toString());
		
		//int userId = Integer.parseInt(userIDquery.get("userID"));
		
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
		ticketsResident.setUserName(user.getFirstName() + " " + user.getLastName());
		ticketsResident.setPhone(user.getPhoneNumber());
		ticketsResident.setUnitNumber(unitNumber);
		ticketsResident.setEmail(user.getUsername());
		return ResponseEntity.status(HttpStatus.OK).body(ticketsResident);
	}

	@CrossOrigin(origins = "http://localhost:3000") // handle CORS error 011022
	@PostMapping("/tickets/{ticket_id}/staff-action")
	public ResponseEntity<String> ticketStatusChangedByStaffAction(@PathVariable(value = "ticket_id") int ticketId,
			@RequestBody Map<String, String> reqBody, HttpServletRequest request) {
		// check session
		//HttpSession session = request.getSession(false);
		//if (session == null) {
		//	return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
		//}

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
				List<TicketWorkAssignee> allAssignee = ticketWorkAssigneeService
						.getAllTicketWorkAssineeByTicketId(ticketId);
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

	@CrossOrigin(origins = "http://localhost:3000") // handle CORS error 011022
	@GetMapping("/tickets/manager")
	public ResponseEntity<ManagerTicketSystemResponse> getManagerTicketSystem(HttpServletRequest request) {
		ManagerTicketSystemResponse response = null;
		try {
			// get user info from session
			//HttpSession session = request.getSession(false);
			//if (session == null) {
			//	return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
			//}
			//int userId = Integer.parseInt(session.getAttribute("userId").toString());
			int userId=Integer.parseInt(request.getHeader("userid"));
			User user = userService.getUserByUserId(userId);

			List<ManagerTicketOverview> tickets = managerTicketOverviewFacadeImpl.getAllManagerTicketOverview();

			// build response
			response = ManagerTicketSystemResponse.builder().tickets(tickets).phone(user.getPhoneNumber())
					.email(user.getUsername()).user_name(user.getFirstName() + " " + user.getLastName()).build();
			return ResponseEntity.status(HttpStatus.OK).body(response);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
		}
	}

	@CrossOrigin(origins = "http://localhost:3000") // handle CORS error 011022
	@PutMapping("/tickets/{ticket_id}/assignees")
	public ResponseEntity<String> assignAssignee(@RequestBody AssigneeForm form,
			@PathVariable("ticket_id") int ticketId, BindingResult result, HttpServletRequest request) {
		if (result.hasErrors()) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Cannot resolve input request");
		}

		try {
			// get user info from session
			//HttpSession session = request.getSession(false);
			//if (session == null) {
			//	return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
			//}
			//int userId = Integer.parseInt(session.getAttribute("userId").toString());
			Enumeration<String> headerNames = request.getHeaderNames();
			while(headerNames.hasMoreElements()) {
				String headerName = headerNames.nextElement();
				System.out.println("Header Name - " + headerName + ", Value - " + request.getHeader(headerName));
			}
			
			int userId=Integer.parseInt(request.getHeader("userid"));
			User user = userService.getUserByUserId(userId);

			// only manager can do assignment
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
			ticket.setStatus(TicketStatus.ASSIGNED);
			ticketService.addTicket(ticket);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.toString());
		}
		return ResponseEntity.status(HttpStatus.OK).body("Ticket Assigned");
	}
}
