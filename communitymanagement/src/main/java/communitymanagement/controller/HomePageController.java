package communitymanagement.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import communitymanagement.model.User;
import communitymanagement.service.UserService;

@RestController
public class HomePageController {

	@Autowired
	private UserService userService;

	@PostMapping("/login")
	public ResponseEntity<Map<String, String>> login(HttpServletRequest req, @RequestBody User user) {
		User attemptUser = null;
		attemptUser = userService.getUserByUsername(user.getUsername());
		Map<String, String> result = new HashMap<>();
		if (attemptUser != null && user.getPassword().equals(attemptUser.getPassword())) {
			result.put("firstName", attemptUser.getFirstName());
			result.put("lastName", attemptUser.getLastName());
			result.put("message", "Logged in successfully");
			HttpSession session = req.getSession(true);
			session.setAttribute("userType", attemptUser.getUserType().toString());
			session.setAttribute("userId", attemptUser.getId());
			return ResponseEntity.status(HttpStatus.OK).body(result);
		}
		result.put("message", "Wrong username or password");
		return ResponseEntity.status(HttpStatus.FORBIDDEN).body(result);
	}

	@GetMapping("/user-logout")
	public ResponseEntity<String> logoutPage(HttpServletRequest request, HttpServletResponse response) {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		if (auth != null) {
			new SecurityContextLogoutHandler().logout(request, response, auth);
		}
		HttpSession session = request.getSession(false);
		if (session != null) {
			session.invalidate();
		}
		return ResponseEntity.status(HttpStatus.OK).body("You have logged out successfully");
	}
}
