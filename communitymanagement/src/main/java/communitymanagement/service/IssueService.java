package communitymanagement.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import communitymanagement.dao.IssueDao;
import communitymanagement.model.Issue;

@Service
public class IssueService {
	
	@Autowired
	private IssueDao issueDao;
	
	public void addIssue(Issue issue) {
		issueDao.addIssue(issue);
	}

	public void deleteIssue(int issueId) {
		issueDao.deleteIssue(issueId);
	}
	
	public void updateIssue(Issue issue) {
		issueDao.updateIssue(issue);
	}

	public Issue getIssueById(int issueId) {
		return issueDao.getIssueById(issueId);
	}
	
	public List<Issue> getAllIssues() {
		return issueDao.getAllIssues();
	}

}
