package communitymanagement.servicefacade;

import communitymanagement.model.Ticket;
import communitymanagement.model.User;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

public interface CalendarServiceFacade {

    User getLoggedInUser(HttpServletRequest request);
    List<Ticket> getTicketsByUserTypeWithTimeRange(String startDate, String endDate, HttpServletRequest request);
}
