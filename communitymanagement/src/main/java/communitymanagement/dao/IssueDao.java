package communitymanagement.dao;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import communitymanagement.model.Issue;

@Repository
public class IssueDao {
	
	@Autowired
	private SessionFactory sessionFactory;
	
	public void addIssue(Issue issue) {
		Session session = null;
		try {
			session = sessionFactory.openSession();
			session.beginTransaction();
			session.save(issue);
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

	public void deleteIssue(int issueId) {
		Session session = null;
		try {
			session = sessionFactory.openSession();
			session.beginTransaction();
			Issue issue = (Issue) session.get(Issue.class, issueId);
			session.delete(issue);
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
	
}
