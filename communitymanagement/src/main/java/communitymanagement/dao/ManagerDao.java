package communitymanagement.dao;

import communitymanagement.model.Manager;
import communitymanagement.model.User;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

@Repository
public class ManagerDao {

    @Autowired
    private SessionFactory sessionFactory;

    public void addManager(Manager manager) {
        
    	Session session = null;

        try {
            session = sessionFactory.openSession();
            session.beginTransaction();
            session.save(manager);
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

    public Manager getManagerByUserName(String userName) {
        User user = null;

        try (Session session = sessionFactory.openSession()) {
            session.beginTransaction();
            CriteriaBuilder builder = session.getCriteriaBuilder();
            CriteriaQuery<User> criteriaQuery = builder.createQuery(User.class);
            Root<User> root = criteriaQuery.from(User.class);
            criteriaQuery.select(root).where(builder.equal(root.get("userName"), userName));
            user = session.createQuery(criteriaQuery).getSingleResult();
            session.getTransaction().commit();
        } catch (Exception e) {
            e.printStackTrace();
        }

        if (user != null) {
            return user.getManager();
        }

        return null;
    }

    public void deleteManager(int managerId) {
        Session session = null;

        try {
            session = sessionFactory.openSession();
            session.beginTransaction();
            Manager manager = session.get(Manager.class, managerId);
            session.delete(manager);
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

    public void updateManager(Manager manager) {
        Session session = null;

        try {
            session = sessionFactory.openSession();
            session.beginTransaction();
            session.saveOrUpdate(manager);
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
