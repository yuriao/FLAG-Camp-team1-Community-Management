package communitymanagement.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import communitymanagement.entity.SimpleResponse;
import communitymanagement.model.User;
import communitymanagement.service.UserService;

@RestController
public class RegistrationController {
	@Autowired
	private UserService userService;
	@PostMapping("/registration/{user_type}") 
	public SimpleResponse registerUser (@RequestBody User user,
			@PathVariable("user_type") String user_type,
			 BindingResult result){	

		String msg1 = "Successfully registered";
		String msg2 = "This email has been registered";
		SimpleResponse simpleResponse1 = SimpleResponse.builder().status("200").message(msg1).build();
		// which response code?
		SimpleResponse simpleResponse2 = SimpleResponse.builder().status("208").message(msg2).build();
		if (result.hasErrors()){
			return simpleResponse2;
		}		
		userService.addUser(user);
		return simpleResponse1;
	}

}
