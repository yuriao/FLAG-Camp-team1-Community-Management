package communitymanagement.entity;

import java.util.List;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Builder
public class ManagerTicketSystemResponse {
	private final List<ManagerTicketOverview> tickets;
	private final String user_name;
	private final String email;
	private final String phone;
}
