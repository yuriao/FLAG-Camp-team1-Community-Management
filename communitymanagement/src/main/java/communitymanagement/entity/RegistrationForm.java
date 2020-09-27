package communitymanagement.entity;

import java.util.Date;

import communitymanagement.model.UserType;
import lombok.Data;

@Data
public class RegistrationForm {
	private String userType;
	private String firstName;
	private String lastName;
	private String userName;
	private String password;
	private String phoneNumber;
	private String unitNum;
	private String birthday;
	private int staffCategoryId;
}
