package communitymanagement.service;

import communitymanagement.dao.StaffDao;
import communitymanagement.model.Staff;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StaffService {

    @Autowired
    private StaffDao staffDao;

    public void addStaff(Staff staff) {
        staffDao.addStaff(staff);
    }

    public Staff getStaffByUserName(String userName) {
        return staffDao.getStaffByUserName(userName);
    }

    public void deleteStaff(int staffId) {
        staffDao.deleteStaff(staffId);
    }

    public void updateStaff(Staff staff) {
        staffDao.updateStaff(staff);
    }
    
    public List<Staff> getStaffsByCategoryId(int staffCategoryId) {
    	return staffDao.getStaffsByCategoryId(staffCategoryId);
    }
}
