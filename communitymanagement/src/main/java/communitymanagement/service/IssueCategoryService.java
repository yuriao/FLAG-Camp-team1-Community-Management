package communitymanagement.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import communitymanagement.dao.IssueCategoryDao;
import communitymanagement.dao.IssueDao;
import communitymanagement.dao.LocationDao;
import communitymanagement.model.Issue;
import communitymanagement.model.IssueCategory;
import communitymanagement.model.Location;

@Service
public class IssueCategoryService {

	@Autowired
	private IssueCategoryDao issueCategoryDao;
	
	@Autowired
	private IssueDao issueDao;
	
	@Autowired
	private LocationDao locationDao;
	
	public void addIssueCategory(IssueCategory issueCategory) {
		issueCategoryDao.addIssueCategory(issueCategory);
	}
	
	public void addIssueCategory(Issue issue, Location location) {
		issueCategoryDao.addIssueCategory(issue, location);
	}

	public List<IssueCategory> getAlIssueCategories() {
		return issueCategoryDao.getAlIssueCategories();
	}

	public IssueCategory getIssueCategoryById(int issueCategoryId) {
		return issueCategoryDao.getIssueCategoryById(issueCategoryId);
	}
	
	public void removeIssueCategory(int issueCategoryId) {
		issueCategoryDao.removeIssueCategory(issueCategoryId);
	}
	
	public void addIssueCategoryByName(String issueName, String locationName) {
		// issue
		Issue issue = issueDao.getIssueByName(issueName);
		if (issue == null) {
			issue = new Issue();
			issue.setIssueType(issueName);
			issueDao.addIssue(issue);
		}

		// category
		Location location = locationDao.getLocationByName(locationName);
		if (location == null) {
			location = new Location();
			location.setLocationType(locationName);
			locationDao.addLocation(location);
		}

		// issue category
		addIssueCategory(issue, location);
	}
	
	public IssueCategory getIssueCategoryByLocationIssue(Location location, Issue issue) {
		return issueCategoryDao.getIssueCategoryByLocationIssue(location, issue);
	}
}
