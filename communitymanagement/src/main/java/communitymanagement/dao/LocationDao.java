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

import communitymanagement.model.Location;

@Repository
public class LocationDao {
	
	@Autowired
	private SessionFactory sessionFactory;
	
	public void addLocation(Location location) {
		Session session = null;
		try {
			session = sessionFactory.openSession();
			session.beginTransaction();
//			// de-duplicate
//			Location existingLocation = getLocationByName(location.getLocationType());
//			if (existingLocation == null) {
				session.saveOrUpdate(location);
				session.getTransaction().commit();
//			}
		} catch (Exception e) {
			e.printStackTrace();
			session.getTransaction().rollback();
		} finally {
			if (session != null) {
				session.close();
			}
		}
	}

	public void deleteLocation(int locationId) {
		Session session = null;
		try {
			session = sessionFactory.openSession();
			session.beginTransaction();
			Location location = (Location) session.get(Location.class, locationId);
			session.delete(location);
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
	
	public void updateLocation(Location location) {
		Session session = null;
		try {
			session = sessionFactory.openSession();
			session.beginTransaction();
			session.saveOrUpdate(location);
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

	public Location getLocationById(int locationId) {
		try (Session session = sessionFactory.openSession()) {
			session.beginTransaction();
			Location location = (Location) session.get(Location.class, locationId);
			session.getTransaction().commit();
			return location;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	public List<Location> getAllLocations() {
		List<Location> locations = new ArrayList<>();
		try (Session session = sessionFactory.openSession()) {
			session.beginTransaction();
			CriteriaBuilder criteriaBuilder = session.getCriteriaBuilder();
			CriteriaQuery<Location> criteriaQuery = criteriaBuilder.createQuery(Location.class);
			Root<Location> root = criteriaQuery.from(Location.class);
			criteriaQuery.select(root);
			locations = session.createQuery(criteriaQuery).getResultList();
			session.getTransaction().commit();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return locations;
	}
}
