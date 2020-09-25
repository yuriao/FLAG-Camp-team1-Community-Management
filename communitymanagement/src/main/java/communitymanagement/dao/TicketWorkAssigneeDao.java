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
			criteriaQuery.select(root).where(criteriaBuilder.equal(root.get("ticket_id"), ticketId));
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

	public List<TicketWorkAssignee> getAllTicketWorkAssineeByUserId(int userId) {

		List<TicketWorkAssignee> ticketWorkAssignees = new ArrayList<>();
		Session session = null;

		try {
			session = sessionFactory.openSession();
			session.beginTransaction();
			CriteriaBuilder criteriaBuilder = session.getCriteriaBuilder();
			CriteriaQuery<TicketWorkAssignee> criteriaQuery = criteriaBuilder.createQuery(TicketWorkAssignee.class);
			Root<TicketWorkAssignee> root = criteriaQuery.from(TicketWorkAssignee.class);
			criteriaQuery.select(root).where(criteriaBuilder.equal(root.get("user_id"), userId));
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

}