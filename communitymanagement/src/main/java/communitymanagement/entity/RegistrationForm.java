package communitymanagement.entity;

import java.util.Date;
import lombok.Data;

@Data
public class RegistrationForm {

	String first_name;
	String last_name;
	String username;
	String password;
	String phone_number;

	String unit_number;
	Date birthday;

	int staffCategoryId;

}
