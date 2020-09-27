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
public class LogInController {
	
	@PostMapping("/login") 
	public SimpleResponse login(@RequestBody User user) {
		
		
		String msg1 = "error, Invalid username and Password";
		SimpleResponse simpleResponse1 = SimpleResponse.builder().status("200").message(msg1).build();

		return simpleResponse1;
	}

}
