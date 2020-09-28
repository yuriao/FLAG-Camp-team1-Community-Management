package communitymanagement.dao;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import communitymanagement.model.Ticket;
import communitymanagement.model.TicketComment;

@Repository
public class TicketCommentDao {
	
	@Autowired
	private SessionFactory sessionFactory;
	
	public void addTicketComment(TicketComment ticketComment) {
		
		Session session = null;
		try {
			session = sessionFactory.openSession();
			session.beginTransaction();
			session.saveOrUpdate(ticketComment);
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
	
	public List<TicketComment> getAllTicketComments(int ticketId) {
		List<TicketComment> ticketComment = new ArrayList<>();
		try (Session session = sessionFactory.openSession()) {
			session.beginTransaction();
			CriteriaBuilder criteriaBuilder = session.getCriteriaBuilder();
			CriteriaQuery<TicketComment> criteriaQuery = criteriaBuilder.createQuery(TicketComment.class);
			Root<TicketComment> root = criteriaQuery.from(TicketComment.class);
			criteriaQuery.select(root).where(criteriaBuilder.equal(root.get("ticket"), ticketId));
			ticketComment = session.createQuery(criteriaQuery).getResultList();
			session.getTransaction().commit();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return ticketComment;
	}
}