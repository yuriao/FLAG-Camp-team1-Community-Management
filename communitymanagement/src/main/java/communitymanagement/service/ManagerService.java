package communitymanagement.service;

import communitymanagement.dao.ManagerDao;
import communitymanagement.model.Manager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ManagerService {

    @Autowired
    private ManagerDao managerDao;

    public void addManager(Manager manager) {
        managerDao.addManager(manager);
    }

    public void getManagerByUserName(String userName) {
        managerDao.getManagerByUserName(userName);
    }

    public void deleteManager(int managerId) {
        managerDao.deleteManager(managerId);
    }

    public void updateManager(Manager manager) {
        managerDao.updateManager(manager);
    }
}
