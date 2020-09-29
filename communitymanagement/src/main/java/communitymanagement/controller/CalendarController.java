package communitymanagement.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import communitymanagement.model.Ticket;
import communitymanagement.model.User;
import communitymanagement.service.UserService;
import communitymanagement.servicefacade.CalendarServiceFacadeImpl;

@RestController
public class CalendarController {
	
	@Autowired
	UserService userService;
	
    @Autowired
    private CalendarServiceFacadeImpl calendarServiceFacadeImpl;

    @GetMapping("/calendar")
    public List<Ticket> getTicketsByUser(@RequestParam(value = "from", defaultValue = "2000-01-01") String startDate,
                                         @RequestParam(value = "to", defaultValue = "2021-01-01") String endDate) {
    	// get user from authentication
    	Authentication loggedInUser = SecurityContextHolder.getContext().getAuthentication();
		String username = loggedInUser.getName();
		User user = userService.getUserByUsername(username);
		int userId = user.getId();
		
        return calendarServiceFacadeImpl.getTicketsByUserIdWithTimeRange(userId, startDate, endDate);
    }
}
