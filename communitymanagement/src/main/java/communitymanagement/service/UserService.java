package communitymanagement.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import communitymanagement.dao.UserDao;
import communitymanagement.model.Resident;
import communitymanagement.model.User;



@Service
public class UserService {
	
    @Autowired
    private UserDao userDao;
    
    public void addUser(User user) {
    	userDao.addUser(user);
    }
    public void getUserByUserId(int id) {
    	userDao.getUserByUserId(id);
    }
    

}
