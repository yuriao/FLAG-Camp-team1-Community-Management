package communitymanagement.controller;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import communitymanagement.entity.RegistrationForm;
import communitymanagement.model.Manager;
import communitymanagement.model.Resident;
import communitymanagement.model.Staff;
import communitymanagement.model.StaffCategory;
import communitymanagement.model.User;
import communitymanagement.model.UserType;
import communitymanagement.service.AuthoritiesService;
import communitymanagement.service.StaffCategoryService;
import communitymanagement.service.UserService;

@RestController
public class RegistrationController {
	@Autowired
	private UserService userService;

	@Autowired
	private AuthoritiesService authoritiesService;

	@Autowired
	private StaffCategoryService staffCategoryService;

	@PostMapping("/registration/{userType}")
	public ResponseEntity<String> registerUser(@RequestBody RegistrationForm form,
			@PathVariable("userType") String userType) {

		// check if this username has been registered
		String userName = form.getUsername();
		if (userService.isUserNameExisted(userName)) {
			return ResponseEntity.status(HttpStatus.ALREADY_REPORTED).body("This email has been registered");
		}

		// add user
		try {
			User user = new User();
			user.setFirstName(form.getFirst_name());
			user.setLastName(form.getLast_name());
			user.setUserName(form.getUsername());
			user.setPassword(form.getPassword());
			user.setPhoneNumber(form.getPhone_number());

			switch (userType) {
			case "resident":
				Resident resident = new Resident();
				resident.setUnitNum(form.getUnit_number());
				Date bDay = new SimpleDateFormat("yyyy-MM-dd").parse(form.getBirthday());
				resident.setBirthday(bDay);
				resident.setUser(user);

				user.setUserType(UserType.RESIDENT);
				user.setResident(resident);

				break;
			case "staff":
				Staff staff = new Staff();
				StaffCategory staffCategory = staffCategoryService.getStaffCategoryById(form.getStaffCategoryId());
				staff.setStaffCategory(staffCategory);
				staff.setUser(user);

				user.setUserType(UserType.STAFF);
				user.setStaff(staff);

				break;
			case "manager":
				Manager manager = new Manager();
				manager.setUser(user);

				user.setUserType(UserType.MANAGER);
				user.setManager(manager);

				break;
			}
			userService.addUser(user);
			authoritiesService.addAuthorities(user);

		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.toString());
		}
		return ResponseEntity.status(HttpStatus.OK).body("Successfully registered");
	}
}
