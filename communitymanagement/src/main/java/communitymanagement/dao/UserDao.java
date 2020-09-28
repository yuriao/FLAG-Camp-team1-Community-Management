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

import communitymanagement.model.Authorities;
import communitymanagement.model.User;
import communitymanagement.model.UserType;

@Repository
public class UserDao {

	@Autowired
	private SessionFactory sessionFactory;

	public void addUser(User user) {
		user.setEnabled(true);
		Authorities authorities = new Authorities();
		authorities.setUserId(user.getId());
		authorities.setUserName(user.getUserName());
		
		UserType user_type = user.getUserType();
		if (user_type.equals(UserType.RESIDENT)) {
			authorities.setAuthorities("ROLE_RESIDENT");
		} else if (user_type.equals(UserType.MANAGER)) {
			authorities.setAuthorities("ROLE_MANAGER");
		} else if (user_type.equals(UserType.STAFF)) {
			authorities.setAuthorities("ROLE_STAFF");
		}
		
		Session session = null;
		try {
			session = sessionFactory.openSession();
			session.beginTransaction();
			session.save(user);
			session.save(authorities);
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
		if (user != null) {
			return user;
		}
		return null;

	}

	public boolean isUserNameExisted(String name) {
		List<User> users = new ArrayList<>();
		try (Session session = sessionFactory.openSession()) {
			session.beginTransaction();
			CriteriaBuilder builder = session.getCriteriaBuilder();
			CriteriaQuery<User> criteriaQuery = builder.createQuery(User.class);
			Root<User> root = criteriaQuery.from(User.class);
			criteriaQuery.select(root).where(builder.equal(root.get("userName"), name));
			users = session.createQuery(criteriaQuery).getResultList();
			session.getTransaction().commit();
		} catch (Exception e) {
			e.printStackTrace();
		}
		if (users.size() > 0) {
			return true;
		}
		return false;
	}

}
