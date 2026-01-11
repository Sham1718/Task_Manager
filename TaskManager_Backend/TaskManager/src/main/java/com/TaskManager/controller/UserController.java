package com.TaskManager.controller;

import com.TaskManager.dto.AuthRequest;
import com.TaskManager.dto.AuthResponse;
import com.TaskManager.repository.UserRepo;
import com.TaskManager.security.JwtUtil;
import com.TaskManager.service.ServiceUser;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")

public class UserController {
    private final UserRepo repo;
    private final JwtUtil util;
    private final ServiceUser service;
    private final AuthenticationManager manager;

    public UserController(UserRepo repo, JwtUtil util, ServiceUser service, AuthenticationManager manager) {
        this.repo = repo;
        this.util = util;
        this.service = service;
        this.manager = manager;
    }



    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody AuthRequest request){
        if (repo.findByUsername(request.getUsername()).isPresent()){
            return ResponseEntity.badRequest().body("Username already taken");
        }
        service.Save(request);
        return ResponseEntity.ok("user Register..!");

    }

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody AuthRequest request
            ){
    try {
        Authentication auth =manager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(),request.getPassword())
        );
        String token =util.generateToken(request.getUsername());
        return ResponseEntity.ok(new AuthResponse(token));
    }
    catch (BadCredentialsException e){
        return ResponseEntity.status(401).body("Invalid credentials");
    }
    }
}
