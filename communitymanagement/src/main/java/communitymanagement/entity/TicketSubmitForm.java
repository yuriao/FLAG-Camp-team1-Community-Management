package communitymanagement.entity;

import communitymanagement.model.TicketPriority;
import lombok.Data;

@Data
public class TicketSubmitForm {
	
	private int userId;
	private String unitNumber;
	private int issueCategoryId;
	private String subject;
	private String description;
	private String availability;
	private TicketPriority priority;
}
