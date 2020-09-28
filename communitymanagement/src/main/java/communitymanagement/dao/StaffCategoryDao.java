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

import communitymanagement.model.StaffCategory;
import communitymanagement.model.WorkAssignment;

@Repository
public class StaffCategoryDao {

    @Autowired
    private SessionFactory sessionFactory;

    public List<StaffCategory> getAllStaffCategory() {
        List<StaffCategory> staffCategories = new ArrayList<>();

        try (Session session = sessionFactory.openSession()) {
            CriteriaBuilder criteriaBuilder = session.getCriteriaBuilder();
            CriteriaQuery<StaffCategory> criteriaQuery = criteriaBuilder.createQuery(StaffCategory.class);
            Root<StaffCategory> root = criteriaQuery.from(StaffCategory.class);
            criteriaQuery.select(root);
            staffCategories = session.createQuery(criteriaQuery).getResultList();
            session.getTransaction().commit();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return staffCategories;
    }
    
    public StaffCategory getStaffCategoryById(int staffCategoryId) {
    	StaffCategory staffCategory = null;
		try (Session session = sessionFactory.openSession()) {
			session.beginTransaction();
			CriteriaBuilder builder = session.getCriteriaBuilder();
			CriteriaQuery<StaffCategory> criteriaQuery = builder.createQuery(StaffCategory.class);
			Root<StaffCategory> root = criteriaQuery.from(StaffCategory.class);
			criteriaQuery.select(root).where(builder.equal(root.get("id"), staffCategoryId));
			staffCategory = session.createQuery(criteriaQuery).getSingleResult();
			session.getTransaction().commit();
		} catch (Exception e) {
			e.printStackTrace();
		}
		if (staffCategory != null)
			return staffCategory;
		return null;
    }
    
    public StaffCategory getStaffCategoryByName(String name) {
    	StaffCategory staffCategory = null;
		try (Session session = sessionFactory.openSession()) {
			session.beginTransaction();
			CriteriaBuilder builder = session.getCriteriaBuilder();
			CriteriaQuery<StaffCategory> criteriaQuery = builder.createQuery(StaffCategory.class);
			Root<StaffCategory> root = criteriaQuery.from(StaffCategory.class);
			criteriaQuery.select(root).where(builder.equal(root.get("category"), name));
			staffCategory = session.createQuery(criteriaQuery).getSingleResult();
			session.getTransaction().commit();
		} catch (Exception e) {
			e.printStackTrace();
		}
		if (staffCategory != null)
			return staffCategory;
		return null;
    }
    
    public StaffCategory getStaffCategoryByWorkAssignmentId(int workAssignmentId) {
    	WorkAssignment workAssignment = null;
    	
    	try (Session session = sessionFactory.openSession()) {
    		session.beginTransaction();
			CriteriaBuilder builder = session.getCriteriaBuilder();
			CriteriaQuery<WorkAssignment> criteriaQuery = builder.createQuery(WorkAssignment.class);
			Root<WorkAssignment> root = criteriaQuery.from(WorkAssignment.class);
			criteriaQuery.select(root).where(builder.equal(root.get("id"), workAssignmentId));
			workAssignment = session.createQuery(criteriaQuery).getSingleResult();
			session.getTransaction().commit();
    	} catch (Exception e) {
			e.printStackTrace();
		}
    	if (workAssignment != null) {
    		return workAssignment.getStaffCategory();
    	}
    	return null;
    }
    
    public void addStaffCategory(StaffCategory staffCategory) {
    	Session session = null;
		try {
			session = sessionFactory.openSession();
			session.beginTransaction();
			session.saveOrUpdate(staffCategory);
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
