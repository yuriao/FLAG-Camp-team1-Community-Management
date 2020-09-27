package communitymanagement.servicefacade;

import communitymanagement.model.Ticket;

import java.util.List;

public interface DashboardServiceFacade {

    List<Ticket> getTickets(String resSpec, int userId);
}
