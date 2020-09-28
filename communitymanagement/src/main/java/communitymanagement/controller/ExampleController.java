package communitymanagement.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import communitymanagement.entity.IssueCategoryForm;
import communitymanagement.entity.SimpleResponse;
import communitymanagement.entity.WorkAssignmentForm;
import communitymanagement.model.IssueCategory;
import communitymanagement.model.StaffCategory;
import communitymanagement.model.User;
import communitymanagement.model.WorkAssignment;
import communitymanagement.service.IssueCategoryService;
import communitymanagement.service.StaffCategoryService;
import communitymanagement.service.WorkAssignmentService;

@RestController
public class ExampleController {
	
	@Autowired
	StaffCategoryService staffCategoryService;
	
	@Autowired
	IssueCategoryService issueCategoryService;
	
	@Autowired
	WorkAssignmentService workAssignmentService;

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
    //	{
    //       "first_name": "This",
    //       "last_name": "that"
    //	}
	@PostMapping("/example/{example_id}")
	public User returnUser(@RequestBody User user, @PathVariable("example_id") int exampleId, 
			@RequestParam(value = "key", defaultValue = "") String key) {
		user.setPhoneNumber(Integer.toString(exampleId));
		user.setPassword(key);
		return user;
	}
	
	@PostMapping("/addStaffCategory")
	public SimpleResponse addStaffCategory(@RequestBody StaffCategory staffCategory){
		staffCategoryService.addStaffCategory(staffCategory);
		SimpleResponse simpleResponse = SimpleResponse.builder().status("200").message("Done").build();
		return simpleResponse;
	}
	
	
	@PostMapping("/addIssueCategory")
	public SimpleResponse addIssueCategory(@RequestBody IssueCategoryForm form){
		issueCategoryService.addIssueCategoryByName(form.getIssue(), form.getLocation());
		SimpleResponse simpleResponse = SimpleResponse.builder().status("200").message("Done").build();
		return simpleResponse;
	}
	
	@PostMapping("/addWorkAssignment")
	public SimpleResponse addWorkAssignment(@RequestBody WorkAssignmentForm form){
		StaffCategory staffCategory = staffCategoryService.getStaffCategoryByName(form.getStaffCategoryName());
		if (staffCategory == null) {
			staffCategory = new StaffCategory();
			staffCategory.setCategory(form.getStaffCategoryName());
			staffCategoryService.addStaffCategory(staffCategory);
		}
		IssueCategory issueCategory = issueCategoryService.getIssueCategoryById(form.getIssueCategoryId());
		WorkAssignment workAssignment = new WorkAssignment();
		workAssignment.setIssue(issueCategory.getIssue());
		workAssignment.setStaffCategory(staffCategory);
		workAssignmentService.addWorkAssignment(workAssignment);
		SimpleResponse simpleResponse = SimpleResponse.builder().status("200").message("Done").build();
		return simpleResponse;
	}
	
}