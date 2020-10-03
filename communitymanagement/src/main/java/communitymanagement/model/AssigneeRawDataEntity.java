package communitymanagement.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.ColumnResult;
import javax.persistence.ConstructorResult;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.SqlResultSetMapping;

import communitymanagement.entity.AssigneeRawData;

@Entity
@SqlResultSetMapping(name = "AssigneeRawDataEntity", classes = {
		@ConstructorResult(targetClass = AssigneeRawData.class, columns = {
				@ColumnResult(name = "ticketId", type = Integer.class),
				@ColumnResult(name = "created", type = Date.class),
				@ColumnResult(name = "issueType", type = String.class),
				@ColumnResult(name = "userId", type = Integer.class),
				@ColumnResult(name = "userFirstName", type = String.class),
				@ColumnResult(name = "userLastName", type = String.class) }) })
public class AssigneeRawDataEntity implements Serializable {
	private static final long serialVersionUID = -4860406805452667396L;
	@Id
	int id;
}
