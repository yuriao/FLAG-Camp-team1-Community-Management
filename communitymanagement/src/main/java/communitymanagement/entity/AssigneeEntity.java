package communitymanagement.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Builder
public class AssigneeEntity {
	private final String name;
	private final int userId;
}
