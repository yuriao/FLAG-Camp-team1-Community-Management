package communitymanagement.entity;

import java.sql.Timestamp;
import java.util.List;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Builder
public class ManagerTicketOverview {
	private final int ticketId;
	private final Timestamp submittedDate;
	private final String issue;
	private final List<AssigneeEntity> assignees;
	private final List<AssigneeEntity> recommendStaff;
}
