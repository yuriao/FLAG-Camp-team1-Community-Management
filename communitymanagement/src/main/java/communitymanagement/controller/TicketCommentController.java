package communitymanagement.controller;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import communitymanagement.entity.SimpleComment;
import communitymanagement.entity.TicketCommentForm;
import communitymanagement.entity.TicketForm;
import communitymanagement.model.Ticket;
import communitymanagement.model.TicketComment;
import communitymanagement.model.TicketWorkAssignee;
import communitymanagement.model.User;
import communitymanagement.service.IssueCategoryService;
import communitymanagement.service.StaffCategoryService;
import communitymanagement.service.TicketCommentService;
import communitymanagement.service.TicketService;
import communitymanagement.service.TicketWorkAssigneeService;
import communitymanagement.service.UserService;
import communitymanagement.service.WorkAssignmentService;

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
			// get user from authentication
			Authentication loggedInUser = SecurityContextHolder.getContext().getAuthentication();
			String username = loggedInUser.getName();
			User currentUser = userService.getUserByUsername(username);
			int userId = currentUser.getId();

			// get Ticket
			Ticket ticket = ticketService.getTicketById(ticketId);

			// check if user is the assignee -- MVP: one ticket has only one assignee
			List<TicketWorkAssignee> ticketWorkAssignees = ticketWorkAssigneeService
					.getAllTicketWorkAssineeByTicketId(ticketId);
			if (ticketWorkAssignees == null | ticketWorkAssignees.size() == 0) {
				return ResponseEntity.status(HttpStatus.FORBIDDEN).body("User is not an assignee of this ticket");
			}
			int assigneeId = ticketWorkAssignees.get(0).getUser().getId();
			if (assigneeId != userId) {
				return ResponseEntity.status(HttpStatus.FORBIDDEN).body("User is not an assignee of this ticket");
			}

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
	public ResponseEntity<TicketForm> getTicketDetail(@PathVariable("ticket_id") int ticketId) {
		// get user from authentication
		Authentication loggedInUser = SecurityContextHolder.getContext().getAuthentication();
		String username = loggedInUser.getName();
		User user = userService.getUserByUsername(username);

		// TODO: check if user can see the ticket -- manager, assigned staff, resident
		// that created the ticket
		// add code here
		TicketForm ticketForm = new TicketForm();
		Ticket ticket = ticketService.getTicketById(ticketId);
		List<TicketComment> ticketComment = ticketCommentService.getAllTicketComments(ticketId);
		ticketForm.setTicket(ticket);
		ticketForm.setTicketComment(ticketComment);
		return ResponseEntity.status(HttpStatus.OK).body(ticketForm);
	}

	@PutMapping("/tickets/{ticket_id}/update")
	public ResponseEntity<String> update(@RequestBody SimpleComment comment, @PathVariable("ticket_id") int ticketId,
			BindingResult result) {
		if (result.hasErrors()) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Fail to build the ticket comment form");
		}
		// get user from authentication
		Authentication loggedInUser = SecurityContextHolder.getContext().getAuthentication();
		String username = loggedInUser.getName();
		User user = userService.getUserByUsername(username);
		int userId = user.getId();

		// TODO: check if user can update the ticket -- manager, assigned staff,
		// resident that created the ticket
		// add code here

		TicketComment ticketComment = new TicketComment();
		ticketComment.setBody(comment.getComment());
		ticketComment.setTicket(ticketService.getTicketById(ticketId));
		ticketComment.setUser(userService.getUserByUserId(userId));

		Date date = new Date();
		Timestamp curTime = new Timestamp(date.getTime());
		ticketComment.setCreated(curTime);
		;
		ticketCommentService.addTicketComment(ticketComment);

		String msg = "Comment Added.";
		return ResponseEntity.status(HttpStatus.OK).body(msg);
	}
}