package communitymanagement.entity;

import lombok.Data;

@Data
public class RegistrationForm {
	// universal
	private String first_name;
	private String last_name;
	private String username;
	private String password;
	private String phone_number;

	// resident
	private String unit_number;
	private String birthday;

	// staff
	private int staffCategoryId;
}