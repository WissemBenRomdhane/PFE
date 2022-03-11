package com.tekup.orchestrateur.controllers;

import java.util.List;
import java.util.NoSuchElementException;

import com.tekup.orchestrateur.exceptions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tekup.orchestrateur.models.User;
import com.tekup.orchestrateur.repositories.UserRepository;
import com.tekup.orchestrateur.services.UserService;

@CrossOrigin
@RestController
public class UserController {
    private UserRepository userRepository;

    @Autowired
    public UserController(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    @PostMapping("/users/save")
    public User saveUser(@RequestBody User user){
        return this.userRepository.save(user);
    }

    @GetMapping("/users/all")
    public ResponseEntity<List<User>> getUsers(){
        return ResponseEntity.ok(
          this.userRepository.findAll()
        );
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<User> getUser(@PathVariable(value = "id" ) int id){
        User user = this.userRepository.findById(id).orElseThrow(
                ()-> new ResourceNotFoundException("User not found")
        );

        return  ResponseEntity.ok().body(user);
    }

    @PutMapping("users/{id}")
    public User updateUser(@RequestBody User newUser, @PathVariable(value = "id") int id){
        return this.userRepository.findById(id)
                .map(user -> {
                    user.setFirstName(newUser.getFirstName());
                    user.setLastName(newUser.getLastName());
                    user.setEmail(newUser.getEmail());
                    user.setUsername(newUser.getUsername());
                    user.setPassword(newUser.getPassword());
                    return this.userRepository.save(user);
                })
                .orElseGet(()->{
                   newUser.setId(id);
                   return this.userRepository.save(newUser);
                });
    }

    @DeleteMapping("users/{id}")
    public ResponseEntity<Void> removeUser(@PathVariable(value = "id") int id){
        User user =this.userRepository.findById(id).orElseThrow(
                ()-> new ResourceNotFoundException("User not found"+id)
        );

        this.userRepository.delete(user);
        return ResponseEntity.ok().build();
    }




}