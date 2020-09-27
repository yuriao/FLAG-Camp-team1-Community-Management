package communitymanagement.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired; 
import org.springframework.stereotype.Service;

import communitymanagement.dao.IssueCategoryDao;
import communitymanagement.model.IssueCategory;
import communitymanagement.model.Issue;
import communitymanagement.model.Location;


@Service
public class IssueCategoryService {

	@Autowired
	private IssueCategoryDao issueCategoryDao;
	
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
}
