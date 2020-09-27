package communitymanagement.dao;

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
import communitymanagement.model.WorkAssignment;

@Repository
public class WorkAssignmentDao {

    @Autowired
    private SessionFactory sessionFactory;

    public void addWorkAssignment(WorkAssignment workAssignment) {
        Session session = null;

        try {
            session = sessionFactory.openSession();
            session.beginTransaction();
            session.save(workAssignment);
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

    public List<WorkAssignment> getWorkAssignmentByIssue(String issueType) {
        Issue issue = null;

        try (Session session = sessionFactory.openSession()) {
            CriteriaBuilder criteriaBuilder = session.getCriteriaBuilder();
            CriteriaQuery<Issue> criteriaQuery = criteriaBuilder.createQuery(Issue.class);
            Root<Issue> root = criteriaQuery.from(Issue.class);
            criteriaQuery.select(root).where(criteriaBuilder.equal(root.get("issueType"), issueType));
            issue = session.createQuery(criteriaQuery).getSingleResult();
            session.getTransaction().commit();
        } catch (Exception e) {
            e.printStackTrace();
        }

        if (issue != null) {
            return issue.getWorkAssignments();
        }

        return null;
    }
    
    public List<WorkAssignment> getWorkAssignmentByIssueCategoryId(int issueCategoryId) {
        IssueCategory issueCategory = null;

        try (Session session = sessionFactory.openSession()) {
            CriteriaBuilder criteriaBuilder = session.getCriteriaBuilder();
            CriteriaQuery<IssueCategory> criteriaQuery = criteriaBuilder.createQuery(IssueCategory.class);
            Root<IssueCategory> root = criteriaQuery.from(IssueCategory.class);
            criteriaQuery.select(root).where(criteriaBuilder.equal(root.get("id"), issueCategoryId));
            issueCategory = session.createQuery(criteriaQuery).getSingleResult();
            session.getTransaction().commit();
        } catch (Exception e) {
            e.printStackTrace();
        }

        if (issueCategory != null) {
            return issueCategory.getIssue().getWorkAssignments();
        }

        return null;
    }

    public void deleteWorkAssignment(int workAssignmentId) {
        Session session = null;

        try {
            session = sessionFactory.openSession();
            session.beginTransaction();
            WorkAssignment workAssignment = session.get(WorkAssignment.class, workAssignmentId);
            session.delete(workAssignment);
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
