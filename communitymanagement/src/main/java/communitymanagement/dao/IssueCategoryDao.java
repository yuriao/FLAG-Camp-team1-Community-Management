package communitymanagement.dao;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import communitymanagement.model.Issue;
import communitymanagement.model.IssueCategory;
import communitymanagement.model.Location;

@Repository
public class IssueCategoryDao {
	@Autowired
	private SessionFactory sessionFactory;
	

	public void addIssueCategory(IssueCategory issueCategory) {
		Session session = null;
		try {
			session = sessionFactory.openSession();
			session.beginTransaction();
			session.saveOrUpdate(issueCategory);
			session.getTransaction().commit();
		} catch (Exception e) {
			e.printStackTrace();
			session.getTransaction().rollback();
		} finally {
			if (session != null) {
				session.close();
			}
		}
	}

	public void addIssueCategory(Issue issue, Location location) {
		IssueCategory issueCategory = new IssueCategory();
		issueCategory.setIssue(issue);
		issueCategory.setLocation(location);
		addIssueCategory(issueCategory);
	}

	public List<IssueCategory> getAlIssueCategories() {
		List<IssueCategory> allIssueCategories = new ArrayList<>();
		try (Session session = sessionFactory.openSession()) {
			session.beginTransaction();
			allIssueCategories = session.createQuery("from IssueCategory", IssueCategory.class).getResultList();
			session.getTransaction().commit();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return allIssueCategories;
	}

	public IssueCategory getIssueCategoryById(int issueCategoryId) {
		IssueCategory issueCategory = null;
		try (Session session = sessionFactory.openSession()) {
			session.beginTransaction();
			issueCategory = (IssueCategory) session.get(IssueCategory.class, issueCategoryId);
			session.getTransaction().commit();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return issueCategory;
	}

	public void removeIssueCategory(int issueCategoryId) {
		Session session = null;
		try {
			session = sessionFactory.openSession();
			IssueCategory issueCategory = (IssueCategory) session.get(IssueCategory.class, issueCategoryId);
			session.beginTransaction();
			session.delete(issueCategory);
			session.getTransaction().commit();
		} catch (Exception e) {
			e.printStackTrace();
			session.getTransaction().rollback();
		} finally {
			if (session != null) {
				session.close();
			}
		}
	}

}
