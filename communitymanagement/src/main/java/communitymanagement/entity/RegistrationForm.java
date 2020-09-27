package communitymanagement.entity;

import java.util.Date;

import communitymanagement.model.StaffCategory;
import communitymanagement.model.UserType;
import lombok.Data;

@Data
public class RegistrationForm {
//	UserType user_type;
	String first_name;
	String last_name;
	String username;
	String password;
	String phone_number;
	
	String unit_number;
	Date birthday;
//	StaffCategory staffCategory;
	

}
