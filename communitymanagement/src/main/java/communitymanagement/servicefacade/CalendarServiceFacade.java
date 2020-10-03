package communitymanagement.servicefacade;

import communitymanagement.model.Ticket;
import communitymanagement.model.User;

import java.util.List;

public interface CalendarServiceFacade {

    User getLoggedInUser();
    List<Ticket> getTicketsByUserTypeWithTimeRange(String startDate, String endDate);
}
