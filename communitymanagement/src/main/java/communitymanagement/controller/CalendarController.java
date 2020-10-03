package communitymanagement.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import communitymanagement.model.Ticket;
import communitymanagement.service.UserService;
import communitymanagement.servicefacade.CalendarServiceFacadeImpl;

@RestController
public class CalendarController {
	
	@Autowired
	UserService userService;
	
    @Autowired
    private CalendarServiceFacadeImpl calendarServiceFacadeImpl;

    @GetMapping("/calendar")
    public ResponseEntity<List<Ticket>> getTicketsByUser(@RequestParam(value = "from", defaultValue = "2000-01-01") String startDate,
                                         @RequestParam(value = "to", defaultValue = "2021-01-01") String endDate,
                                         HttpServletRequest request) {
		// get user info from session
		HttpSession session= request.getSession(false);
		if (session == null) {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
		}
		int userId = Integer.parseInt(session.getAttribute("userId").toString());
		
        return ResponseEntity.status(HttpStatus.OK).body(calendarServiceFacadeImpl.getTicketsByUserIdWithTimeRange(userId, startDate, endDate));
    }
}
