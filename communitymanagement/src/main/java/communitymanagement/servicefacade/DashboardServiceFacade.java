package communitymanagement.servicefacade;

import communitymanagement.model.Ticket;
import communitymanagement.model.User;

import java.util.List;

public interface DashboardServiceFacade {

    User getLoggedInUser();
    List<Ticket> getTickets(String resSpec);
}
