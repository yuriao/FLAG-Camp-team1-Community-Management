package communitymanagement.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import communitymanagement.dao.UserDao;
import communitymanagement.model.User;

@Service
public class UserService {

	@Autowired
	private UserDao userDao;

	public void addUser(User user) {
		userDao.addUser(user);
	}

	public User getUserByUserId(int id) {
		return userDao.getUserByUserId(id);
	}

	public boolean isUserNameExisted(String name) {
		return userDao.isUserNameExisted(name);
	}

	public User getUserByUsername(String username) {
		return userDao.getUserByUsername(username);
	}
}
