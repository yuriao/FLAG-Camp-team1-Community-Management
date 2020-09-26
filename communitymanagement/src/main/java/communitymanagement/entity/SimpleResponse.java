package communitymanagement.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Builder
public class SimpleResponse {
	private final String status;
	private final String message;
}
