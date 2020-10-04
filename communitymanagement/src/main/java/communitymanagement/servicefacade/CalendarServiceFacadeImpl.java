package communitymanagement.servicefacade;

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import communitymanagement.model.Ticket;
import communitymanagement.model.TicketWorkAssignee;
import communitymanagement.model.User;
import communitymanagement.model.UserType;
import communitymanagement.service.TicketService;
import communitymanagement.service.TicketWorkAssigneeService;
import communitymanagement.service.UserService;

@Service
public class CalendarServiceFacadeImpl implements CalendarServiceFacade {

    @Autowired
    private UserService userService;

    @Autowired
    private TicketService ticketService;

    @Autowired
    private  TicketWorkAssigneeService ticketWorkAssigneeService;

    @Override
    public User getLoggedInUser(HttpServletRequest request) {
    	// get user info from session
		HttpSession session = request.getSession(false);
		int userId = Integer.parseInt(session.getAttribute("userId").toString());
		return userService.getUserByUserId(userId);
    }

    @Override
    public List<Ticket> getTicketsByUserTypeWithTimeRange(String startDate, String endDate, HttpServletRequest request) {
        User user = getLoggedInUser(request);
        UserType userType = user.getUserType();
        int userId = user.getId();
        List<Ticket> tickets = new ArrayList<>();

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
                for (TicketWorkAssignee ticketWorkAssignee : ticketWorkAssignees) {
                    tickets.add(ticketService.getTicketByIdWithTimeRange(ticketWorkAssignee.getTicket().getId(), startTimestamp, endTimestamp));
                }
            }
        } catch (ParseException e) {
            e.printStackTrace();
        }

        return tickets;
    }
}
