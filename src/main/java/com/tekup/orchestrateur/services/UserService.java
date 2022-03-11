package com.tekup.orchestrateur.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tekup.orchestrateur.models.User;
import com.tekup.orchestrateur.repositories.UserRepository;

@Service
@Transactional
public class UserService {
	 @Autowired
	    private UserRepository userRepository;
	    public List<User> listAllUser() {
	        return userRepository.findAll();
	    }

	    public void saveUser(User user) {
	        userRepository.save(user);
	    }

	    public User getUser(Integer id) {
	        return userRepository.findById(id).get();
	    }

	    public void deleteUser(Integer id) {
	        userRepository.deleteById(id);
	    }

}
