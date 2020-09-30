package communitymanagement.dao;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import communitymanagement.model.Authorities;
import communitymanagement.model.User;
import communitymanagement.model.UserType;

@Repository
public class AuthoritiesDao {
	@Autowired
	private SessionFactory sessionFactory;
	
	public void addAuthorities(User user) {
		Authorities authorities = new Authorities();
		authorities.setUserId(user.getId());
		authorities.setUsername(user.getUsername());
		
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
}
