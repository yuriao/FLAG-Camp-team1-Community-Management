package communitymanagement.servicefacade;

import communitymanagement.model.Ticket;
import communitymanagement.model.TicketWorkAssignee;
import communitymanagement.model.User;
import communitymanagement.model.UserType;
import communitymanagement.service.TicketService;
import communitymanagement.service.TicketWorkAssigneeService;
import communitymanagement.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class CalendarServiceFacadeImpl implements CalendarServiceFacade {

    @Autowired
    private UserService userService;

    @Autowired
    private TicketService ticketService;

    @Autowired
    private  TicketWorkAssigneeService ticketWorkAssigneeService;

    @Override
    public User getLoggedInUser() {
        // get user from authentication
        Authentication loggedInUser = SecurityContextHolder.getContext().getAuthentication();
        String username = loggedInUser.getName();
        return userService.getUserByUsername(username);
    }

    @Override
    public List<Ticket> getTicketsByUserTypeWithTimeRange(String startDate, String endDate) {
        User user = getLoggedInUser();
        UserType userType = user.getUserType();
        int userId = user.getId();
        List<Ticket> tickets = null;

        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
        try {
            Date start = simpleDateFormat.parse(startDate);
            Date end = simpleDateFormat.parse(endDate);
            Timestamp startTimestamp = new Timestamp(start.getTime());
            Timestamp endTimestamp = new Timestamp(end.getTime());
            if (userType == UserType.RESIDENT) {
                tickets = ticketService.getTicketsByUserIdWithTimeRange(userId, startTimestamp, endTimestamp);
            } else if (userType == UserType.MANAGER) {
                tickets = ticketService.getAllTicketsWithTimeRange(startTimestamp, endTimestamp);
            } else if (userType == UserType.STAFF) {
                List<TicketWorkAssignee> ticketWorkAssignees = ticketWorkAssigneeService.getAllTicketWorkAssigneeByUserId(userId);
                List<Ticket> curTickets = new ArrayList<>();
                for (TicketWorkAssignee ticketWorkAssignee : ticketWorkAssignees) {
                    tickets.add(ticketService.getTicketByIdWithTimeRange(ticketWorkAssignee.getTicket().getId(), startTimestamp, endTimestamp));
                }
                tickets = curTickets;
            }
        } catch (ParseException e) {
            e.printStackTrace();
        }

        return tickets;
    }
}
