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

import communitymanagement.model.Staff;
import communitymanagement.model.StaffCategory;
import communitymanagement.model.User;

@Repository
public class StaffDao {

    @Autowired
    private SessionFactory sessionFactory;

    public void addStaff(Staff staff) {

        Session session = null;

        try {
            session = sessionFactory.openSession();
            session.beginTransaction();
            session.save(staff);
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

    public Staff getStaffByUserName(String userName) {
        User user = null;

        try (Session session = sessionFactory.openSession()) {
            session.beginTransaction();
            CriteriaBuilder criteriaBuilder = session.getCriteriaBuilder();
            CriteriaQuery<User> criteriaQuery = criteriaBuilder.createQuery(User.class);
            Root<User> root = criteriaQuery.from(User.class);
            criteriaQuery.select(root).where(criteriaBuilder.equal(root.get("userName"), userName));
            user = session.createQuery(criteriaQuery).getSingleResult();
            session.getTransaction().commit();
        } catch (Exception e) {
            e.printStackTrace();
        }

        if (user != null) {
            return user.getStaff();
        }

        return null;
    }
 

    public List<Staff> getStaffByCategory(String category) {
        StaffCategory staffCategory = null;

        try (Session session = sessionFactory.openSession()) {
            CriteriaBuilder criteriaBuilder = session.getCriteriaBuilder();
            CriteriaQuery<StaffCategory> criteriaQuery = criteriaBuilder.createQuery(StaffCategory.class);
            Root<StaffCategory> root = criteriaQuery.from(StaffCategory.class);
            criteriaQuery.select(root).where(criteriaBuilder.equal(root.get("category"), category));
            staffCategory = session.createQuery(criteriaQuery).getSingleResult();
            session.getTransaction().commit();
        } catch (Exception e) {
            e.printStackTrace();
        }

        if (staffCategory != null) {
            return staffCategory.getStaff();
        }

        return null;
    }
    
    public List<Staff> getStaffsByCategoryId(int staffCategoryId) {
        StaffCategory staffCategory = null;
        List<Staff> staffs = new ArrayList<>();
        try (Session session = sessionFactory.openSession()) {
            CriteriaBuilder criteriaBuilder = session.getCriteriaBuilder();
            CriteriaQuery<StaffCategory> criteriaQuery = criteriaBuilder.createQuery(StaffCategory.class);
            Root<StaffCategory> root = criteriaQuery.from(StaffCategory.class);
            criteriaQuery.select(root).where(criteriaBuilder.equal(root.get("id"), staffCategoryId));
            staffCategory = session.createQuery(criteriaQuery).getSingleResult();
  
            if (staffCategory != null) {
            	staffs = staffCategory.getStaff();
            }
            session.getTransaction().commit();
        } catch (Exception e) {
            e.printStackTrace();
        }

        if (staffs != null) {
            return staffs;
        }

        return null;
    }

    public void deleteStaff(int staffId) {
        Session session = null;

        try {
            session = sessionFactory.openSession();
            session.beginTransaction();
            Staff staff = session.get(Staff.class, staffId);
            session.delete(staff);
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

    public void updateStaff(Staff staff) {
        Session session = null;

        try {
            session = sessionFactory.openSession();
            session.beginTransaction();
            session.saveOrUpdate(staff);
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
