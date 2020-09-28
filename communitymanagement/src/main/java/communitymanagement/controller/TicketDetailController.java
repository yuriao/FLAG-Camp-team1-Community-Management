package communitymanagement.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import communitymanagement.entity.SimpleResponse;
import communitymanagement.entity.TicketCommentForm;
import communitymanagement.entity.TicketForm;
import communitymanagement.model.Ticket;
import communitymanagement.model.TicketComment;
import communitymanagement.service.TicketCommentService;
import communitymanagement.service.TicketService;

@RestController
public class TicketDetailController {
	@Autowired
	private TicketCommentService ticketCommentService;
	
	@Autowired
	private TicketService ticketService;
	
	@GetMapping("/tickets/{ticket_id}/{user_id}")
	public TicketForm getTicketDetail(@PathVariable("ticket_id") int ticketId, @PathVariable("user_id") int userId ) {
		//awaiting authentication
		TicketForm ticketForm = new TicketForm();
		Ticket ticket = ticketService.getTicketById(ticketId);
		List<TicketComment> ticketComment = ticketCommentService.getAllTicketComments(ticketId);
		ticketForm.setTicket(ticket);
		ticketForm.setTicketComment(ticketComment);
		return ticketForm;
	}
	
	@PutMapping("/tickets/{ticket_id}/update")
	public SimpleResponse update(@RequestBody TicketComment ticketComment, @PathVariable("ticket_id") int ticketId) {
		//awaiting authentication
		String msg = "Comment success";
		SimpleResponse simpleResponse = SimpleResponse.builder().status("200").message(msg).build();
		return simpleResponse;
	}
	
	@PutMapping("/tickets/{ticket_id}/staff-update")
	public SimpleResponse staffUpdate(@RequestBody TicketCommentForm form, @PathVariable("ticket_id") int ticketId) {
		String msg = Integer.toString(ticketId) + ": " + form.getComment() + " on " + form.getFixDate();
		SimpleResponse simpleResponse = SimpleResponse.builder().status("200").message(msg).build();
		return simpleResponse;
	}
}
