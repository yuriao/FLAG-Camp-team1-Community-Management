package communitymanagement.entity;

import lombok.Data;

@Data
public class RegistrationForm {

	private String first_name;
	private String last_name;
	private String username;
	private String password;
	private String phone_number;

	private String unit_number;
	private String birthday;

	private int staffCategoryId;

}