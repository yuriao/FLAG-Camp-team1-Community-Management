package communitymanagement.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import communitymanagement.entity.TicketAssigned;
import communitymanagement.model.Issue;
import communitymanagement.model.IssueCategory;
import communitymanagement.model.Location;
import communitymanagement.service.IssueCategoryService;
import communitymanagement.service.IssueService;
import communitymanagement.service.LocationService;
import communitymanagement.service.TicketAssignedService;

@RestController
public class TicketIssueController {
	
	@Autowired
	private TicketAssignedService ticketAssignedService;
	
	@Autowired
	private IssueService issueService;
	
	@Autowired
	private LocationService locationService;
	
	@Autowired
	private IssueCategoryService issueCategoryService;
	
	@GetMapping("/tickets/staff")
	public List<TicketAssigned> getTickets(@RequestParam(value = "user_id", defaultValue = "") int userId) {
		return ticketAssignedService.getTicketAssignedByUserId(userId);
	}

	@GetMapping("/ticket-issue-categories")
	public Map<String, Map<String, Integer>> allIssueLocationCategory() {
		Map<String, Map<String, Integer>> allIssueLocationCategory = new HashMap<>();
		List<IssueCategory> allIssueCategories = issueCategoryService.getAlIssueCategories();
		List<Location> locations = locationService.getAllLocations();
		List<Issue> issues = issueService.getAllIssues();
		for (Location location : locations) {
			Map<String, Integer> issueList = new HashMap<>();
			for (Issue issue : issues) {
				for (IssueCategory issueCategory : allIssueCategories) {
					if (issueCategory.getIssue().getId() == issue.getId() && issueCategory.getLocation().getId() == location.getId()) {
						issueList.put(issue.getIssueType(), issueCategory.getId());
					} 
				}
			}
			allIssueLocationCategory.put(location.getLocationType(),issueList);
		}
		return allIssueLocationCategory;
	}
}
