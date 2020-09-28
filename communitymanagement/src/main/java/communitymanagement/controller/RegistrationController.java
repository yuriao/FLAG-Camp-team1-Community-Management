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
import communitymanagement.model.StaffCategory;
import communitymanagement.model.User;
import communitymanagement.model.UserType;
import communitymanagement.service.ManagerService;
import communitymanagement.service.ResidentService;
import communitymanagement.service.StaffCategoryService;
import communitymanagement.service.StaffService;
import communitymanagement.service.UserService;

@RestController
public class RegistrationController {
	@Autowired
	private UserService userService;
	private ManagerService managerService;
	private ResidentService residentService;
	private StaffService staffService;
	private StaffCategoryService staffCategoryService;

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
		User user = new User();
		user.setFirstName(form.getFirst_name());
		user.setLastName(form.getLast_name());
		user.setUserName(form.getUsername());
		user.setPassword(form.getPassword());
		user.setPhoneNumber(form.getPhone_number());

		switch (user_type) {
		case "resident":	
			Resident resident = new Resident();
			resident.setUnitNum(form.getUnit_number());
			resident.setBirthday(form.getBirthday());
			resident.setUser(user);
			
			user.setResident(resident);
			user.setUserType(UserType.RESIDENT);
			user.setManager(null);
			user.setStaff(null);
			
			userService.addUser(user);

			break;
		case "staff":
			Staff staff = new Staff();
			staff.setUser(user);
			
			StaffCategory staffCategory = staffCategoryService.getStaffCategoryById(10);
			//form.getStaffCategoryId()
			staff.setStaffCategory(staffCategory);
			
			user.setUserType(UserType.STAFF);
			user.setStaff(staff);
			user.setManager(null);
			user.setResident(null);
			
			userService.addUser(user);
			break;
		case "manager":
			
			Manager manager = new Manager();
			manager.setUser(user);
			
			user.setUserType(UserType.MANAGER);
			user.setResident(null);
			user.setStaff(null);
			user.setManager(manager);
			
			userService.addUser(user);
			break;
		}



		return simpleResponse1;

	}

}
