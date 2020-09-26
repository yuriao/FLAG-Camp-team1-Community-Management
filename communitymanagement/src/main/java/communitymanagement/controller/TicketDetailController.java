package communitymanagement.controller;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import communitymanagement.entity.SimpleResponse;
import communitymanagement.entity.TicketCommentForm;

@RestController
public class TicketDetailController {
	
	@PutMapping("/tickets/{ticket_id}/staff-update")
	public SimpleResponse staffUpdate(@RequestBody TicketCommentForm form, @PathVariable("ticket_id") int ticketId) {
		String msg = Integer.toString(ticketId) + ": " + form.getComment() + " on " + form.getFixDate();
		SimpleResponse simpleResponse = SimpleResponse.builder().status("200").message(msg).build();
		return simpleResponse;
	}

}
