package communitymanagement.controller;

import java.sql.Timestamp;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import communitymanagement.entity.SimpleResponse;
import communitymanagement.entity.TicketCommentForm;
import communitymanagement.model.Ticket;
import communitymanagement.model.TicketComment;
import communitymanagement.model.User;
import communitymanagement.service.IssueCategoryService;
import communitymanagement.service.StaffCategoryService;
import communitymanagement.service.TicketCommentService;
import communitymanagement.service.TicketService;
import communitymanagement.service.TicketWorkAssigneeService;
import communitymanagement.service.UserService;
import communitymanagement.service.WorkAssignmentService;
import communitymanagement.servicefacade.AssigneeRecommendationFacadeImpl;


@RestController
public class TicketCommentController {
	
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
	
	@Autowired
	IssueCategoryService issueCategoryService;
	
	
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
		
		int userId = 68;
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