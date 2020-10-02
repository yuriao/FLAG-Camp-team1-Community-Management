package communitymanagement.servicefacade;

import communitymanagement.model.Ticket;
import communitymanagement.model.TicketWorkAssignee;
import communitymanagement.model.User;
import communitymanagement.service.TicketService;
import communitymanagement.service.TicketWorkAssigneeService;
import communitymanagement.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class DashboardServiceFacadeImpl implements DashboardServiceFacade {

    @Autowired
    private UserService userService;

    @Autowired
    private TicketService ticketService;

    @Autowired
    private TicketWorkAssigneeService ticketWorkAssigneeService;

    @Override
    public User getLoggedInUser() {
        // get user from authentication
        Authentication loggedInUser = SecurityContextHolder.getContext().getAuthentication();
        String username = loggedInUser.getName();
        return userService.getUserByUsername(username);
    }

    @Override
    public List<Ticket> getTickets(String resSpec) {
        User user = this.getLoggedInUser();
        int userId = user.getId();

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
