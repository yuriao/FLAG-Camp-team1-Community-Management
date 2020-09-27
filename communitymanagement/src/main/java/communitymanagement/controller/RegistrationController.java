package communitymanagement.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import communitymanagement.entity.RegistrationForm;
import communitymanagement.entity.SimpleResponse;
import communitymanagement.model.Manager;
import communitymanagement.model.Resident;
import communitymanagement.model.Staff;
import communitymanagement.model.User;
import communitymanagement.model.UserType;
import communitymanagement.service.ManagerService;
import communitymanagement.service.ResidentService;
import communitymanagement.service.StaffService;
import communitymanagement.service.UserService;

@RestController
public class RegistrationController {
	@Autowired
	private UserService userService;
	private ManagerService managerService;
	private ResidentService residentService;
	private StaffService staffService;

	@PostMapping("/registration/{user_type}")
	public SimpleResponse registerUser(@RequestBody RegistrationForm form,
			@PathVariable("user_type") String user_type) {

		String msg1 = "Successfully registered";
		String msg2 = "This email has been registered";
		SimpleResponse simpleResponse1 = SimpleResponse.builder().status("200").message(msg1).build();
		SimpleResponse simpleResponse2 = SimpleResponse.builder().status("208").message(msg2).build();

		// check if this username has been registered
		String userName = form.getUsername();
		if (userService.isUserNameExisted(userName)) {
			return simpleResponse2;
		}

		// add user
		User user = User.builder().firstName(form.getFirst_name()).lastName(form.getLast_name())
				.userName(form.getUsername()).password(form.getPassword()).phoneNumber(form.getPhone_number()).build();

		switch (user_type) {
		case "resident":
			user.setUserType(UserType.RESIDENT);
			Resident resident = Resident.builder().unitNum(form.getUnit_number()).birthday(form.getBirthday()).build();
			residentService.addResident(resident);
			break;
		case "staff":
			user.setUserType(UserType.STAFF);
			Staff staff = Staff.builder().build();
			staffService.addStaff(staff);
			break;
		case "manager":
			user.setUserType(UserType.MANAGER);
			Manager manager = Manager.builder().build();
			managerService.addManager(manager);
		}

		userService.addUser(user);

		return simpleResponse1;

	}

}
