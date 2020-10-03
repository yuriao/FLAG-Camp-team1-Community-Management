package communitymanagement.dao;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import communitymanagement.entity.AssigneeRawData;
import communitymanagement.model.TicketWorkAssignee;

@Repository
public class TicketWorkAssigneeDao {
	@Autowired
	private SessionFactory sessionFactory;

	public void addTickeWorkAssignee(TicketWorkAssignee ticketWorkAssignee) {

		Session session = null;

		try {
			session = sessionFactory.openSession();
			session.beginTransaction();
			session.save(ticketWorkAssignee);
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

	public void deleteTickeWorkAssigneeById(int ticketWorkAssigneeId) {

		Session session = null;

		try {
			session = sessionFactory.openSession();
			session.beginTransaction();
			TicketWorkAssignee ticketWorkAssignee = (TicketWorkAssignee) session.get(TicketWorkAssignee.class,
					ticketWorkAssigneeId);
			session.delete(ticketWorkAssignee);
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

	public List<TicketWorkAssignee> getAllTicketWorkAssineeByTicketId(int ticketId) {

		List<TicketWorkAssignee> ticketWorkAssignees = new ArrayList<>();
		Session session = null;

		try {
			session = sessionFactory.openSession();
			session.beginTransaction();
			CriteriaBuilder criteriaBuilder = session.getCriteriaBuilder();
			CriteriaQuery<TicketWorkAssignee> criteriaQuery = criteriaBuilder.createQuery(TicketWorkAssignee.class);
			Root<TicketWorkAssignee> root = criteriaQuery.from(TicketWorkAssignee.class);
			criteriaQuery.select(root).where(criteriaBuilder.equal(root.get("ticket"), ticketId));
			ticketWorkAssignees = session.createQuery(criteriaQuery).getResultList();
			session.getTransaction().commit();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (session != null) {
				session.close();
			}
		}

		return ticketWorkAssignees;
	}

	public List<TicketWorkAssignee> getAllTicketWorkAssigneeByUserId(int userId) {

		List<TicketWorkAssignee> ticketWorkAssignees = new ArrayList<>();
		Session session = null;

		try {
			session = sessionFactory.openSession();
			session.beginTransaction();
			CriteriaBuilder criteriaBuilder = session.getCriteriaBuilder();
			CriteriaQuery<TicketWorkAssignee> criteriaQuery = criteriaBuilder.createQuery(TicketWorkAssignee.class);
			Root<TicketWorkAssignee> root = criteriaQuery.from(TicketWorkAssignee.class);
			criteriaQuery.select(root).where(criteriaBuilder.equal(root.get("user"), userId));
			ticketWorkAssignees = session.createQuery(criteriaQuery).getResultList();
			session.getTransaction().commit();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (session != null) {
				session.close();
			}
		}
		return ticketWorkAssignees;
	}

	@SuppressWarnings("unchecked")
	public List<AssigneeRawData> getAllExistingAssignment() {
		List<AssigneeRawData> result = new ArrayList<>();
		try (Session session = sessionFactory.openSession()) {
			String sql = "SELECT ticket.id AS ticketId, ticket.created, issue.issue_type AS issueType, user.id AS userId, user.first_name AS userFirstName, user.last_name AS userLastName "
					+ "FROM ticket INNER JOIN issue_category ic ON ticket.issue_category_id = ic.id "
					+ "INNER JOIN issue ON issue.id = ic.issue_id "
					+ "INNER JOIN ticket_work_assignee twa ON ticket.id = twa.ticket_id "
					+ "INNER JOIN user ON twa.user_id = user.id";
			EntityManager em = session.getEntityManagerFactory().createEntityManager();
			Query query = em.createNativeQuery(sql, "AssigneeRawDataEntity");
			result = query.getResultList();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}

	@SuppressWarnings("unchecked")
	public List<AssigneeRawData> getAllPossibleStaffRecommendation() {
		List<AssigneeRawData> result = new ArrayList<>();
		try (Session session = sessionFactory.openSession()) {
			String sql = "SELECT ticket.id AS ticketId, ticket.created, issue.issue_type AS issueType, user.id AS userId, user.first_name AS userFirstName, user.last_name AS userLastName "
					+ "FROM ticket INNER JOIN issue_category ic ON ticket.issue_category_id = ic.id "
					+ "INNER JOIN issue ON issue.id = ic.issue_id "
					+ "INNER JOIN work_assignment wa ON ic.issue_id = wa.issue_id "
					+ "INNER JOIN staff ON staff.staffCategory_id = wa.staffCategory_id "
					+ "INNER JOIN user ON user.id = staff.user_id "
					+ "WHERE NOT EXISTS (SELECT 1 FROM ticket_work_assignee WHERE ticket.id = ticket_work_assignee.ticket_id)";
			EntityManager em = session.getEntityManagerFactory().createEntityManager();
			Query query = em.createNativeQuery(sql, "AssigneeRawDataEntity");
			result = query.getResultList();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}

}