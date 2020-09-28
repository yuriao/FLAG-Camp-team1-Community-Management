package communitymanagement.entity;
import java.sql.Timestamp;

import communitymanagement.model.TicketStatus;
import lombok.Data;

@Data
public class TicketOverview {

	private int ticketId;
	private String subject;
	private TicketStatus status;
	private Timestamp fixDate;
	private Timestamp completeDate;
}
