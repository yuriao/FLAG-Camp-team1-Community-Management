package communitymanagement.controller;

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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
import communitymanagement.entity.RegistrationForm;
import communitymanagement.entity.SimpleResponse;
import communitymanagement.entity.TicketCommentForm;
import communitymanagement.model.Manager;
import communitymanagement.model.Resident;
import communitymanagement.model.Staff;
import communitymanagement.model.StaffCategory;
import communitymanagement.model.Ticket;
import communitymanagement.model.TicketComment;
import communitymanagement.model.TicketWorkAssignee;
import communitymanagement.model.User;
import communitymanagement.model.UserType;
import communitymanagement.service.StaffCategoryService;
import communitymanagement.service.TicketCommentService;
import communitymanagement.service.TicketService;
import communitymanagement.service.TicketWorkAssigneeService;
import communitymanagement.service.UserService;
import communitymanagement.service.WorkAssignmentService;
import communitymanagement.servicefacade.AssigneeRecommendationFacadeImpl;

@RestController
public class TicketDetailController {
	
	@Autowired
	TicketService ticketService;
	
	@Autowired
	TicketCommentService ticketCommentService;
	
	@Autowired
	UserService userService;
	
	@Autowired
	TicketWorkAssigneeService ticketWorkAssigneeService;
	
	@Autowired
	StaffCategoryService staffCategoryService;
	
	@Autowired
	WorkAssignmentService workAssignmentService;
	
	@Autowired
	AssigneeRecommendationFacadeImpl assigneeRecommendationFacadeImpl;
	
	@PostMapping("/registration")
	public SimpleResponse createUser(@RequestBody RegistrationForm form) throws ParseException {
		User user = new User();
		user.setFirstName(form.getFirstName());
		user.setLastName(form.getLastName());
		user.setPassword(form.getPassword());
		user.setPhoneNumber(form.getPhoneNumber());
		user.setUserName(form.getUserName());
				
		if (form.getUserType().equals("resident")) {
			Resident resident = new Resident();
			Date bDay = new SimpleDateFormat("MM-dd-yyyy").parse(form.getBirthday());
			resident.setBirthday(bDay);
			resident.setUnitNum(form.getUnitNum());
			resident.setUser(user);
			user.setResident(resident);
			user.setStaff(null);
			user.setManager(null);
		} else if (form.getUserType().equals("manager")) {
			Manager manager = new Manager();
			user.setManager(manager);
			user.setResident(null);
			user.setStaff(null);
			manager.setUser(user);
		} else if (form.getUserType().equals("staff")){
			Staff staff = new Staff();
			StaffCategory staffCategory = staffCategoryService.getStaffCategoryById(form.getStaffCategoryId());
			staff.setStaffCategory(staffCategory);
			staff.setUser(user);
			user.setStaff(staff);
			user.setManager(null);
			user.setResident(null);
		} else {
			System.out.print(form.getUserType().length());
			System.out.print(form.getUserType());
		}
		userService.addUser(user);
		SimpleResponse simpleResponse = SimpleResponse.builder().status("200").message("created").build();
		return simpleResponse;
	}
	
	@PostMapping("/tickets/submit") 
	public SimpleResponse createTicket(@RequestBody Ticket ticket, @RequestParam(value = "user") int userId){
		User user = userService.getUserByUserId(userId);
		ticket.setUser(user);
		ticketService.addTicket(ticket);
		SimpleResponse simpleResponse = SimpleResponse.builder().status("200").message("ticketCreated").build();
		return simpleResponse;
	}
	
	// this is the key
	@GetMapping("/tickets/manager")
	public ManagerTicketSystemResponse getManagerTicketSystem(@RequestParam(value = "user") int userId) {
		// get user
		// Authentication loggedInUser = SecurityContextHolder.getContext().getAuthentication();
		// User user = (User)loggedInUser.getPrincipal();
		// int userId = user.getId();
		
		User user = userService.getUserByUserId(userId);
				
		List<Ticket> tickets = ticketService.getAllTickets();
		
		// build response
		List<ManagerTicketOverview> managerTicketOverviews = new ArrayList<>();
		for (Ticket ticket: tickets) {
			
			List<AssigneeEntity> existAssignees = new ArrayList<>();
			List<AssigneeEntity> recommendAssignees = new ArrayList<>();
			
			// find existing assignees
			List<TicketWorkAssignee> ticketWorkAssignees = ticketWorkAssigneeService.getAllTicketWorkAssineeByTicketId(ticket.getId());
			if (ticketWorkAssignees.size() == 0) {
				existAssignees = null;
			} else {
				for (TicketWorkAssignee twa: ticketWorkAssignees) {
					User existAssigneeUser = twa.getUser();
					AssigneeEntity existAssignee = AssigneeEntity.builder()
							.name(existAssigneeUser.getFirstName() + " " + existAssigneeUser.getLastName())
							.userId(existAssigneeUser.getId())
							.build();
					existAssignees.add(existAssignee);
				}
			}
			
			// recommend assignees if existing assignees do not exist
			if (existAssignees != null) {
				recommendAssignees = null;
			} else {
				recommendAssignees = assigneeRecommendationFacadeImpl.getTicketAssineeRecommendation(ticket.getIssueCategory().getId());
			}
			
			ManagerTicketOverview managerTicketOverview = ManagerTicketOverview.builder()
					.ticketId(ticket.getId())
					.submittedDate(ticket.getCreated())
					.issue(ticket.getIssueCategory().getIssue().getIssueType())
					.assignees(existAssignees)
					.recommendStaff(recommendAssignees)
					.build();
			managerTicketOverviews.add(managerTicketOverview);
		}
		
		ManagerTicketSystemResponse response = ManagerTicketSystemResponse.builder()
				.tickets(managerTicketOverviews)
				.phone(user.getPhoneNumber())
				.email(user.getUserName())
				.user_name(user.getFirstName() + " " + user.getLastName())
				.build();		
		return response;
	}
	
	@PutMapping("/tickets/{ticket_id}/assignees")
	public SimpleResponse assignAssignee(@RequestBody AssigneeForm form, @PathVariable("ticket_id") int ticketId, BindingResult result, @RequestParam(value = "user") int userId) {
		if (result.hasErrors()) {
			SimpleResponse simpleResponse = SimpleResponse.builder().status("500").message("Cannot resolve input request").build();
			return simpleResponse;
		}
		
		// get user
		// Authentication loggedInUser = SecurityContextHolder.getContext().getAuthentication();
		// User user = (User)loggedInUser.getPrincipal();
		// int userId = user.getId();
		
		// only manager can do assignment
		User user = userService.getUserByUserId(userId);
		if (user.getUserType() != UserType.MANAGER) {
			SimpleResponse simpleResponse = SimpleResponse.builder().status("400").message("Only MANAGER can assign job").build();
			return simpleResponse;
		}
		
		Ticket ticket = ticketService.getTicketById(ticketId);
		
		for (int theId : form.getAssignees()) {
			User assignee = userService.getUserByUserId(theId);
			TicketWorkAssignee ticketWorkAssignee = new TicketWorkAssignee();
			ticketWorkAssignee.setTicket(ticket);
			ticketWorkAssignee.setUser(assignee);
			ticketWorkAssigneeService.addTickeWorkAssignee(ticketWorkAssignee);
		}
		SimpleResponse simpleResponse = SimpleResponse.builder().status("200").message("Ticket Assigned").build();
		return simpleResponse;
	}
	
	@PutMapping("/tickets/{ticket_id}/staff-update")
	public SimpleResponse staffUpdate(@RequestBody TicketCommentForm form, @PathVariable("ticket_id") int ticketId, BindingResult result) {
		
		if (result.hasErrors()) {
			String msg = "Fail to build the ticket comment form";
			SimpleResponse simpleResponse = SimpleResponse.builder().status("500").message(msg).build();
			return simpleResponse;
		}
		
		String comment = form.getComment();
		String fixDate = form.getFixDate();
		
		if (comment == null & fixDate == null) {
			String msg = "No input provided";
			SimpleResponse simpleResponse = SimpleResponse.builder().status("200").message(msg).build();
			return simpleResponse;
		}
		
		// get user
		// Authentication loggedInUser = SecurityContextHolder.getContext().getAuthentication();
		// User user = (User)loggedInUser.getPrincipal();
		// int userId = user.getId();
		
		int userId = 2;
		User currentUser = userService.getUserByUserId(userId);
		
		// get Ticket
		Ticket ticket = ticketService.getTicketById(ticketId);
		
		// message
		String msg = "";
		
		if (comment != null) {
			TicketComment ticketComment = new TicketComment();
			ticketComment.setBody(comment);
			ticketComment.setTicket(ticket);
			ticketComment.setUser(currentUser);
			ticketCommentService.addTicketComment(ticketComment);
			msg = msg + "Comment Added.";
		}
		if (fixDate != null) {
			Timestamp ts = Timestamp.valueOf(fixDate);
			ticketService.updateTicketFixDate(ticketId, ts);
			if (msg == "") {
					msg = "Fix date updated.";
			} else {
				msg = msg + " Fix date updated.";
			}
		}
		
		SimpleResponse simpleResponse = SimpleResponse.builder().status("200").message(msg).build();
		
		return simpleResponse;
	}
}
