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
//		UserType type = user.getUserType();
//		if (type.equals(UserType.RESIDENT)) {
//			ResidentDao r = new ResidentDao();
//			r.addResident(user);
//		} else if (type.equals(UserType.MANAGER)) {
//			
//		} else if (type.equals(UserType.STAFF) ) {
//			
//		}
//		
//	}
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
		
		
		
	public User getUserByUserName(String userName) {
		User user = null;
		try (Session session = sessionFactory.openSession()) {
                    session.beginTransaction();
			CriteriaBuilder builder = session.getCriteriaBuilder();
			CriteriaQuery<User> criteriaQuery = builder.createQuery(User.class);
			Root<User> root = criteriaQuery.from(User.class);
			criteriaQuery.select(root).where(builder.equal(root.get("emailId"), userName));
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
