package communitymanagement.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import communitymanagement.model.Ticket;
import communitymanagement.model.User;
import communitymanagement.service.UserService;
import communitymanagement.servicefacade.DashboardServiceFacadeImpl;

@RestController
public class DashboardController {

    @Autowired
    private UserService userService;
	
	@Autowired
    private DashboardServiceFacadeImpl dashboardServiceFacadeImpl;

    @GetMapping("/dashboard/resident")
    public List<Ticket> getTicketsAsResident() {
    	// get user from authentication
    	Authentication loggedInUser = SecurityContextHolder.getContext().getAuthentication();
		String username = loggedInUser.getName();
		User user = userService.getUserByUsername(username);
		int userId = user.getId();
		
        return dashboardServiceFacadeImpl.getTickets("resident", userId);
    }

    @GetMapping("/dashboard/manager")
    public List<Ticket> getTicketsAsManager() {
    	// get user from authentication
    	Authentication loggedInUser = SecurityContextHolder.getContext().getAuthentication();
		String username = loggedInUser.getName();
		User user = userService.getUserByUsername(username);
		int userId = user.getId();
		
        return dashboardServiceFacadeImpl.getTickets("manager", userId);
    }

    @GetMapping("/dashboard/staff")
    public List<Ticket> getTicketsAsStaff() {
    	// get user from authentication
    	Authentication loggedInUser = SecurityContextHolder.getContext().getAuthentication();
		String username = loggedInUser.getName();
		User user = userService.getUserByUsername(username);
		int userId = user.getId();
		
        return dashboardServiceFacadeImpl.getTickets("staff", userId);
    }
}

