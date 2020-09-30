package communitymanagement.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomePageController {

	@PostMapping("/login")
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
	
	@GetMapping(value="/logout")
    public ResponseEntity<String>  logoutPage (HttpServletRequest request, HttpServletResponse response) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null){    
            new SecurityContextLogoutHandler().logout(request, response, auth);
        }
        return ResponseEntity.status(HttpStatus.OK).body("You have logged out successfully");
    }
}
