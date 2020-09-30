package communitymanagement.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import communitymanagement.entity.IssueCategoryForm;
import communitymanagement.entity.WorkAssignmentForm;
import communitymanagement.model.Issue;
import communitymanagement.model.StaffCategory;
import communitymanagement.model.User;
import communitymanagement.model.WorkAssignment;
import communitymanagement.service.IssueCategoryService;
import communitymanagement.service.IssueService;
import communitymanagement.service.StaffCategoryService;
import communitymanagement.service.UserService;
import communitymanagement.service.WorkAssignmentService;

@RestController
public class ExampleController {

	@Autowired
	StaffCategoryService staffCategoryService;

	@Autowired
	IssueCategoryService issueCategoryService;

	@Autowired
	WorkAssignmentService workAssignmentService;
	
	@Autowired
	IssueService issueService;

	@Autowired
	UserService userService;

	// Cannot use @RequestBody in GetMapping
	// try to GET http://localhost:8080/communitymanagement/example/1234?key=xxy
	@GetMapping("/example/{example_id}")
	public ResponseEntity<String> returnSimpleResponse(@PathVariable("example_id") int exampleId,
			@RequestParam(value = "key", defaultValue = "") String key) {
		try {
			String msg = Integer.toString(exampleId) + ":" + key;
			return ResponseEntity.status(HttpStatus.OK).body(msg);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.toString());
		}
	}

	// Can use @RequestBody, @PathVariable, @RequestParam
	// try to POST
	// http://localhost:8080/communitymanagement/example/5678?key=ThisIsGood
	// with body
	// {
	// "first_name": "This",
	// "last_name": "that"
	// }
	@PostMapping("/example/{example_id}")
	public User returnUser(@RequestBody User user, @PathVariable("example_id") int exampleId,
			@RequestParam(value = "key", defaultValue = "") String key) {
		user.setPhoneNumber(Integer.toString(exampleId));
		user.setPassword(key);
		return user;
	}

	// Admin end points
	@PostMapping("/addStaffCategory")
	public ResponseEntity<String> addStaffCategory(@RequestBody StaffCategory staffCategory, BindingResult result) {
		if (result.hasErrors()) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Cannot resolve input request");
		}
		try {
			staffCategoryService.addStaffCategory(staffCategory);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.toString());
		}
		return ResponseEntity.status(HttpStatus.CREATED).body("Done");
	}

	@PostMapping("/addIssueCategory")
	public ResponseEntity<String> addIssueCategory(@RequestBody IssueCategoryForm form, BindingResult result) {
		if (result.hasErrors()) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Cannot resolve input request");
		}
		try {
			if (form.getIssue() == null | form.getLocation() == null) {
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Wrong location/issue");
			}
			issueCategoryService.addIssueCategoryByName(form.getIssue(), form.getLocation());
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.toString());
		}
		return ResponseEntity.status(HttpStatus.CREATED).body("Done");

	}

	@PostMapping("/addWorkAssignment")
	public ResponseEntity<String> addWorkAssignment(@RequestBody WorkAssignmentForm form, BindingResult result) {
		if (result.hasErrors()) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Cannot resolve input request");
		}
		try {
			Issue issue = issueService.getIssueById(form.getIssueId());
			
			StaffCategory staffCategory = staffCategoryService.getStaffCategoryByName(form.getStaffCategoryName());
			if (staffCategory == null) {
				staffCategory = new StaffCategory();
				staffCategory.setCategory(form.getStaffCategoryName());
				staffCategoryService.addStaffCategory(staffCategory);
			}
			
			WorkAssignment workAssignment = new WorkAssignment();
			workAssignment.setIssue(issue);
			workAssignment.setStaffCategory(staffCategory);
			workAssignmentService.addWorkAssignment(workAssignment);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.toString());
		}
		return ResponseEntity.status(HttpStatus.CREATED).body("Done");
	}

	@GetMapping("/getStaffCategories")
	public Map<String, Integer> getStaffCategories() {
		Map<String, Integer> response = new HashMap<>();
		List<StaffCategory> staffCategories = staffCategoryService.getAllStaffCategory();
		for (StaffCategory sc : staffCategories) {
			response.put(sc.getCategory(), sc.getId());
		}
		return response;
	}

}