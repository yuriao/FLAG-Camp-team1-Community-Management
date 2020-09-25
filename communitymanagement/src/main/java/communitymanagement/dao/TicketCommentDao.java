package communitymanagement.dao;

import java.util.ArrayList;
import java.util.List;


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
	
	public List<TicketComment> getAllTicketComments(Ticket ticket) {
		List<TicketComment> ticketComment = new ArrayList<>();
		int id = ticket.getId();
		try (Session session = sessionFactory.openSession()) {
			session.beginTransaction();
			ticketComment = session.createCriteria(TicketComment.class).add(Restrictions.eq("ticket_id" ,id)).list();
			session.getTransaction().commit();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return ticketComment;
	}
}