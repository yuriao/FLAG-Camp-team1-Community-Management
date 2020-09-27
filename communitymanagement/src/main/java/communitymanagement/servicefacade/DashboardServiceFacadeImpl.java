package communitymanagement.servicefacade;

import communitymanagement.model.Ticket;
import communitymanagement.model.TicketWorkAssignee;
import communitymanagement.service.TicketService;
import communitymanagement.service.TicketWorkAssigneeService;
import communitymanagement.service.WorkAssignmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class DashboardServiceFacadeImpl implements DashboardServiceFacade {

    @Autowired
    private TicketService ticketService;

    @Autowired
    private TicketWorkAssigneeService ticketWorkAssigneeService;

    @Override
    public List<Ticket> getTickets(String resSpec, int userId) {
        if (resSpec.equals("resident")) {
            return ticketService.getTicketsByUser(userId);
        } else if (resSpec.equals("manager")) {
            return ticketService.getAllTickets();
        } else if (resSpec.equals("staff")) {
            List<TicketWorkAssignee> ticketWorkAssignees = ticketWorkAssigneeService.getAllTicketWorkAssineeByUserId(userId);
            List<Ticket> tickets = new ArrayList<>();
            for (TicketWorkAssignee ticketWorkAssignee : ticketWorkAssignees) {
                tickets.add(ticketService.getTicketById(ticketWorkAssignee.getTicket().getId()));
            }
            return tickets;
        }

        return null;
    }
}
