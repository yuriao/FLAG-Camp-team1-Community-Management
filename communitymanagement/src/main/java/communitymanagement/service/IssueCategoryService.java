package communitymanagement.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired; 
import org.springframework.stereotype.Service;

import communitymanagement.dao.IssueCategoryDao;
import communitymanagement.model.IssueCategory;


@Service
public class IssueCategoryService {

	@Autowired
	private IssueCategoryDao issueCategoryDao;
	
	public void addIssueCategory(IssueCategory issueCategory) {
		issueCategoryDao.addIssueCategory(issueCategory);
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
