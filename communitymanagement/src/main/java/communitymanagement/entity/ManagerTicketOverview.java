package communitymanagement.entity;

import java.util.List;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Builder
public class ManagerTicketOverview {
	private int ticketId;
	private String submittedDate;
	private String issue;
	private List<AssigneeEntity> assignees;
	private List<AssigneeEntity> recommendStaff;
}
