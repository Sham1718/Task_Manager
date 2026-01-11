package com.TaskManager.service;

import com.TaskManager.dto.AuthRequest;
import com.TaskManager.model.User;
import com.TaskManager.repository.UserRepo;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class ServiceUser {

    private final PasswordEncoder encoder;
    private final UserRepo repo;

    public ServiceUser(PasswordEncoder encoder, UserRepo repo) {
        this.encoder = encoder;
        this.repo = repo;
    }

    public void Save(AuthRequest request){
        User user=new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPhoneNo(request.getPhoneNo());
        user.setPassword(encoder.encode(request.getPassword()));
        repo.save(user);
    }
}
