package communitymanagement.servicefacade;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import communitymanagement.model.Ticket;
import communitymanagement.model.TicketWorkAssignee;
import communitymanagement.model.User;
import communitymanagement.service.TicketService;
import communitymanagement.service.TicketWorkAssigneeService;
import communitymanagement.service.UserService;

@Service
public class DashboardServiceFacadeImpl implements DashboardServiceFacade {

    @Autowired
    private UserService userService;

    @Autowired
    private TicketService ticketService;

    @Autowired
    private TicketWorkAssigneeService ticketWorkAssigneeService;

    @Override
	public User getLoggedInUser(HttpServletRequest request) {
		// get user info from session
		//HttpSession session= request.getSession(false);
		//int userId = Integer.parseInt(session.getAttribute("userId").toString());
    	int userId=Integer.parseInt(request.getHeader("userid"));
		return userService.getUserByUserId(userId);
    }

    @Override
    public List<Ticket> getTickets(String resSpec, HttpServletRequest request) {
        User user = this.getLoggedInUser(request);
        int userId = user.getId();
        System.out.println(userId);
        if (resSpec.equals("resident")) {
            return ticketService.getTicketsByUser(userId);
        } else if (resSpec.equals("manager")) {
            return ticketService.getAllTickets();
        } else if (resSpec.equals("staff")) {
            List<TicketWorkAssignee> ticketWorkAssignees = ticketWorkAssigneeService.getAllTicketWorkAssigneeByUserId(userId);
            List<Ticket> tickets = new ArrayList<>();
            for (TicketWorkAssignee ticketWorkAssignee : ticketWorkAssignees) {
                tickets.add(ticketService.getTicketById(ticketWorkAssignee.getTicket().getId()));
            }
            return tickets;
        }

        return null;
    }
}
