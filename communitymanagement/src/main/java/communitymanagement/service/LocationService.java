package communitymanagement.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import communitymanagement.dao.LocationDao;
import communitymanagement.model.Location;

@Service
public class LocationService {
	
	@Autowired
	private LocationDao lcationDao;
	
	public void addLocation(Location location) {
		lcationDao.addLocation(location);
	}

	public void deleteLocation(int locationId) {
		lcationDao.deleteLocation(locationId);
	}
	
	public void updateLocation(Location location) {
		lcationDao.updateLocation(location);
	}

	public Location getLocationById(int locationId) {
		return lcationDao.getLocationById(locationId);
	}
}
