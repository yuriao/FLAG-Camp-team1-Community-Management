package communitymanagement.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import communitymanagement.entity.SimpleResponse;
import communitymanagement.model.User;

@RestController
public class ExampleController {

	// Cannot use @RequestBody in GetMapping
	// try to GET http://localhost:8080/communitymanagement/example/1234?key=xxy
	@GetMapping("/example/{example_id}")
	public SimpleResponse returnSimpleResponse(@PathVariable("example_id") int exampleId, 
			@RequestParam(value = "key", defaultValue = "") String key) {
		String msg = Integer.toString(exampleId) + ":" + key;
		SimpleResponse simpleResponse = SimpleResponse.builder().status("200").message(msg).build();
		return simpleResponse;
	}
	
	// Can use @RequestBody, @PathVariable, @RequestParam
	// try to POST http://localhost:8080/communitymanagement/example/5678?key=ThisIsGood
	// with body
	//    	{
	//           "first_name": "This",
	//           "last_name": "that"
	//    	}
	@PostMapping("/example/{example_id}")
	public User returnUser(@RequestBody User user, @PathVariable("example_id") int exampleId, 
			@RequestParam(value = "key", defaultValue = "") String key) {
		user.setPhoneNumber(Integer.toString(exampleId));
		user.setPassword(key);
		return user;
	}
	
}