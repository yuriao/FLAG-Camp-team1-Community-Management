package communitymanagement.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class HomePageController {

	@RequestMapping(value = "/index", method = RequestMethod.GET)
	public String sayIndex() {
		return "index";
	}

	@RequestMapping("/login")
	public ResponseEntity<String> login(@RequestParam(value = "error", required = false) String error,
			@RequestParam(value = "logout", required = false) String logout) {
		
		if (error != null) {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Invalid username and Password");
		}
		
		if (logout != null) {
			return ResponseEntity.status(HttpStatus.OK).body("You have logged out successfully");
		}
		
		return ResponseEntity.status(HttpStatus.OK).body("You have logged in successfully");
	}


	@RequestMapping(value = "/aboutus", method = RequestMethod.GET)
	public String sayAbout() {
		return "aboutUs";
	}
}
