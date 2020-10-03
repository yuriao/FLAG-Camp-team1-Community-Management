package communitymanagement.entity;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
public class AssigneeRawData {
	int ticketId;
	Date created;
	String issueType;
	int userId;
	String userFirstName;
	String userLastName;
}
