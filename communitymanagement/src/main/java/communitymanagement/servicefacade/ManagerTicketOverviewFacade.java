package communitymanagement.servicefacade;

import java.text.ParseException;
import java.util.List;

import communitymanagement.entity.ManagerTicketOverview;

public interface ManagerTicketOverviewFacade {
	List<ManagerTicketOverview> getAllManagerTicketOverview() throws ParseException;
}
