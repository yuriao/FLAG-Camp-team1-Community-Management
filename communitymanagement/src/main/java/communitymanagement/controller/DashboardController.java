package communitymanagement.controller;

import java.util.Enumeration;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import communitymanagement.model.Ticket;
import communitymanagement.servicefacade.DashboardServiceFacadeImpl;

@RestController
public class DashboardController {

	@Autowired
	private DashboardServiceFacadeImpl dashboardServiceFacadeImpl;

	@CrossOrigin(origins = "http://localhost:3000") // handle CORS error 011022
	@GetMapping("/dashboard/resident")
	public ResponseEntity<List<Ticket>> getTicketsAsResident(HttpServletRequest request) {
		// check session
		//HttpSession session = request.getSession(false);
		
		//Enumeration<String> headerNames = request.getHeaderNames();
		//while(headerNames.hasMoreElements()) {
		//  String headerName = headerNames.nextElement();
		//  System.out.println("Header Name - " + headerName + ", Value - " + request.getHeader(headerName));
		//}
		
		//if (session == null) {
		//	return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
		//}
		return ResponseEntity.status(HttpStatus.OK).body(dashboardServiceFacadeImpl.getTickets("resident", request));
	}

	@CrossOrigin(origins = "http://localhost:3000") // handle CORS error 011022
	@GetMapping("/dashboard/manager")
	public ResponseEntity<List<Ticket>> getTicketsAsManager(HttpServletRequest request) {
		// check session
		//HttpSession session = request.getSession(false);
		//if (session == null) {
		//	return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
		//}
		return ResponseEntity.status(HttpStatus.OK).body(dashboardServiceFacadeImpl.getTickets("manager", request));
	}

	@CrossOrigin(origins = "http://localhost:3000") // handle CORS error 011022
	@GetMapping("/dashboard/staff")
	public ResponseEntity<List<Ticket>> getTicketsAsStaff(HttpServletRequest request) {
		// check session
		//HttpSession session = request.getSession(false);
		//if (session == null) {
		//	return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
		//}
		System.out.println("staff ticket request");
		return ResponseEntity.status(HttpStatus.OK).body(dashboardServiceFacadeImpl.getTickets("staff", request));
	}
}
