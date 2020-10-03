package communitymanagement.servicefacade;

import communitymanagement.model.Ticket;
import communitymanagement.model.User;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

public interface DashboardServiceFacade {

	User getLoggedInUser(HttpServletRequest request);

	List<Ticket> getTickets(String resSpec, HttpServletRequest request);
}
