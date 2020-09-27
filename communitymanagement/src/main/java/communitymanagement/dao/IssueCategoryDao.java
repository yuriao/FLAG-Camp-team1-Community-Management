package communitymanagement.dao;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

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
	
	public Issue getIssueByName(String name) {
		Issue issue = null;
		try (Session session = sessionFactory.openSession()) {
			session.beginTransaction();
			CriteriaBuilder builder = session.getCriteriaBuilder();
			CriteriaQuery<Issue> criteriaQuery = builder.createQuery(Issue.class);
			Root<Issue> root = criteriaQuery.from(Issue.class);
			criteriaQuery.select(root).where(builder.equal(root.get("issueType"), name));
			issue = session.createQuery(criteriaQuery).getSingleResult();
			session.getTransaction().commit();
		} catch (Exception e) {
			e.printStackTrace();
		}
		if (issue != null)
			return issue;
		return null;
	}
	
	public Location getLocationByName(String name) {
		Location location = null;
		try (Session session = sessionFactory.openSession()) {
			session.beginTransaction();
			CriteriaBuilder builder = session.getCriteriaBuilder();
			CriteriaQuery<Location> criteriaQuery = builder.createQuery(Location.class);
			Root<Location> root = criteriaQuery.from(Location.class);
			criteriaQuery.select(root).where(builder.equal(root.get("locationType"), name));
			location = session.createQuery(criteriaQuery).getSingleResult();
			session.getTransaction().commit();
		} catch (Exception e) {
			e.printStackTrace();
		}
		if (location != null)
			return location;
		return null;
	}
	
	public void addIssue(Issue issue) {
		Session session = null;
		try {
			session = sessionFactory.openSession();
			session.beginTransaction();
			session.saveOrUpdate(issue);
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
	
	public void addLocation(Location location) {
		Session session = null;
		try {
			session = sessionFactory.openSession();
			session.beginTransaction();
			session.saveOrUpdate(location);
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
	
	public void addIssueCategoryByName(String issueName, String locationName) {
		// issue
		Issue issue = getIssueByName(issueName);
		if (issue == null) {
			issue = new Issue();
			issue.setIssueType(issueName);
			addIssue(issue);
		}
		
		// category
		Location location = getLocationByName(locationName);
		if (location == null) {
			location = new Location();
			location.setLocationType(locationName);
			addLocation(location);
		}
		
		// issue category
		addIssueCategory(issue, location);
	}
	
	
	public void addIssueCategory(Issue issue, Location location) {
		IssueCategory issueCategory =  new IssueCategory();
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
