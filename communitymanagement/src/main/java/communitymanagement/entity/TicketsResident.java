package communitymanagement.entity;
import java.util.List;

import lombok.Data;

@Data
public class TicketsResident {
	private List<TicketOverview> tickets;
	private String userName;
	private String unitNumber;
	private String email;
	private String phone;
}
