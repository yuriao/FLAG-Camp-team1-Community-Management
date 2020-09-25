package communitymanagement.service;

import communitymanagement.dao.StaffCategoryDao;
import communitymanagement.model.StaffCategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StaffCategoryService {

    @Autowired
    private StaffCategoryDao staffCategoryDao;

    public List<StaffCategory> getAllStaffCategory() {
        return staffCategoryDao.getAllStaffCategory();
    }
}
