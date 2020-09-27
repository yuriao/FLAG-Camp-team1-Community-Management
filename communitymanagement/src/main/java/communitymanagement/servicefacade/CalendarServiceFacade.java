package communitymanagement.servicefacade;

import communitymanagement.model.Ticket;

import java.util.List;

public interface CalendarServiceFacade {

    List<Ticket> getTicketsByUserIdWithTimeRange(int userId, String startDate, String endDate);
}
