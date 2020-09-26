package communitymanagement.dao;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;

import communitymanagement.model.User;
import communitymanagement.model.UserType;

public class UserDao {
	@Autowired
	private SessionFactory sessionFactory;

	public void addUser(User user) {
		user.setEnabled(true);
		Session session = null;

		try {
			session = sessionFactory.openSession();
			session.beginTransaction();
			session.save(user);
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

	public User getUserByUserId(int id) {
		User user = null;
		try (Session session = sessionFactory.openSession()) {
			session.beginTransaction();
			CriteriaBuilder builder = session.getCriteriaBuilder();
			CriteriaQuery<User> criteriaQuery = builder.createQuery(User.class);
			Root<User> root = criteriaQuery.from(User.class);
			criteriaQuery.select(root).where(builder.equal(root.get("id"), id));
			user = session.createQuery(criteriaQuery).getSingleResult();
			session.getTransaction().commit();
		} catch (Exception e) {
			e.printStackTrace();
		}
		if (user != null)
			return user;
		return null;

	}

}
