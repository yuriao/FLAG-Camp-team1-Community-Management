package communitymanagement.controller;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import communitymanagement.entity.SimpleComment;
import communitymanagement.entity.TicketCommentForm;
import communitymanagement.entity.TicketForm;
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
	public ResponseEntity<String> staffUpdate(@RequestBody TicketCommentForm form,
			@PathVariable("ticket_id") int ticketId, BindingResult result) {
		if (result.hasErrors()) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Fail to build the ticket comment form");
		}

		String comment = form.getComment();
		String fixDate = form.getFixDate();

		if (comment == null & fixDate == null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No input provided");
		}

		String msg = "";
		try {
			// get user
			// Authentication loggedInUser =
			// SecurityContextHolder.getContext().getAuthentication();
			// User user = (User)loggedInUser.getPrincipal();
			// int userId = user.getId();

			int userId = 164;
			User currentUser = userService.getUserByUserId(userId);

			// get Ticket
			Ticket ticket = ticketService.getTicketById(ticketId);

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
				if (msg.length() == 0) {
					msg = "Fix date updated.";
				} else {
					msg = msg + " Fix date updated.";
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.toString());
		}
		return ResponseEntity.status(HttpStatus.OK).body(msg);
	}
	
	@GetMapping("/tickets/{ticket_id}")
	public ResponseEntity<TicketForm> getTicketDetail(@PathVariable("ticket_id") int ticketId, @RequestParam("userId") int userId) {
		//awaiting authentication
		TicketForm ticketForm = new TicketForm();
		Ticket ticket = ticketService.getTicketById(ticketId);
		List<TicketComment> ticketComment = ticketCommentService.getAllTicketComments(ticketId);
		ticketForm.setTicket(ticket);
		ticketForm.setTicketComment(ticketComment);
		return ResponseEntity.status(HttpStatus.OK).body(ticketForm);
	}
	
	@PutMapping("/tickets/{ticket_id}/update")
	public ResponseEntity<String> update(@RequestBody SimpleComment comment, @PathVariable("ticket_id") int ticketId, @RequestParam("userId") int userId, BindingResult result) {
		//awaiting authentication
		if (result.hasErrors()) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Fail to build the ticket comment form");
		}
		TicketComment ticketComment = new TicketComment();
		ticketComment.setBody(comment.getComment());
		ticketComment.setTicket(ticketService.getTicketById(ticketId));
		ticketComment.setUser(userService.getUserByUserId(userId));
		
		Date date = new Date();
		Timestamp curTime = new Timestamp(date.getTime());
		ticketComment.setCreated(curTime);;
		ticketCommentService.addTicketComment(ticketComment);
		
		String msg = "Comment Added.";
		return ResponseEntity.status(HttpStatus.OK).body(msg);
	}
}