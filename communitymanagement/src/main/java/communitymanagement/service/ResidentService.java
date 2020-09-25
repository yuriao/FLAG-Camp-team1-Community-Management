package communitymanagement.service;

import communitymanagement.dao.ResidentDao;
import communitymanagement.model.Resident;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ResidentService {

    @Autowired
    private ResidentDao residentDao;

    public void addResident(Resident resident) {
        residentDao.addResident(resident);
    }

    public void getResidentByUserName(String userName) {
        residentDao.getResidentByUserName(userName);
    }

    public void deleteResident(int residentId) {
        residentDao.deleteResident(residentId);
    }

    public void updateResident(Resident resident) {
        residentDao.updateResident(resident);
    }
}
