package communitymanagement.entity;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import java.sql.Timestamp;

import communitymanagement.model.Issue;

@Setter
@Getter
@Data
public class TicketAssigned {
	
	private int ticketId;
	private String unitNumber;
	private Timestamp submittedDate;
	private Issue issue;
	
}
