package communitymanagement.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import communitymanagement.dao.AuthoritiesDao;
import communitymanagement.model.User;

@Service
public class AuthoritiesService {
	
	@Autowired
	private AuthoritiesDao authoritiesDao;
	
	public void addAuthorities(User user) {
		authoritiesDao.addAuthorities(user);
	}
}
