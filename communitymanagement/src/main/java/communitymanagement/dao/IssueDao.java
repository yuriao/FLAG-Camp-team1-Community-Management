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

@Repository
public class IssueDao {
	
	@Autowired
	private SessionFactory sessionFactory;
	
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
	
	public void addIssue(Issue issue) {
		Session session = null;
		try {
			session = sessionFactory.openSession();
			session.beginTransaction();
			// de-duplicate
			Issue existingIssue = getIssueByName(issue.getIssueType());
			if (existingIssue == null) {
				session.saveOrUpdate(issue);
				session.getTransaction().commit();
			}
		} catch (Exception e) {
			e.printStackTrace();
			session.getTransaction().rollback();
		} finally {
			if (session != null) {
				session.close();
			}
		}
	}

	public void deleteIssue(int issueId) {
		Session session = null;
		try {
			session = sessionFactory.openSession();
			session.beginTransaction();
		} catch (Exception e) {
			e.printStackTrace();
			session.getTransaction().rollback();
		} finally {
			if (session != null) {
				session.close();
			}
		}
	}
	
	public void updateIssue(Issue issue) {
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

	public Issue getIssueById(int issueId) {
		try (Session session = sessionFactory.openSession()) {
			session.beginTransaction();
			Issue issue = (Issue) session.get(Issue.class, issueId);
			session.getTransaction().commit();
			return issue;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	public List<Issue> getAllIssues() {
		List<Issue> issues = new ArrayList<>();
		try (Session session = sessionFactory.openSession()) {
			session.beginTransaction();
			CriteriaBuilder criteriaBuilder = session.getCriteriaBuilder();
			CriteriaQuery<Issue> criteriaQuery = criteriaBuilder.createQuery(Issue.class);
			Root<Issue> root = criteriaQuery.from(Issue.class);
			criteriaQuery.select(root);
			issues = session.createQuery(criteriaQuery).getResultList();
			session.getTransaction().commit();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return issues;
	}
	
}
