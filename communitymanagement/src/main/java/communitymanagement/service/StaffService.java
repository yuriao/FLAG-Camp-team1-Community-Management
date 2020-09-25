package communitymanagement.service;

import communitymanagement.dao.StaffDao;
import communitymanagement.model.Staff;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StaffService {

    @Autowired
    private StaffDao staffDao;

    public void addStaff(Staff staff) {
        staffDao.addStaff(staff);
    }

    public void getStaffByUserName(String userName) {
        staffDao.getStaffByUserName(userName);
    }

    public void deleteStaff(int staffId) {
        staffDao.deleteStaff(staffId);
    }

    public void updateStaff(Staff staff) {
        staffDao.updateStaff(staff);
    }
}
