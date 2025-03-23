package com.arjuncodes.studentsystem.controller;

import com.arjuncodes.studentsystem.model.User;
import com.arjuncodes.studentsystem.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@CrossOrigin
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/adduser")
    public String adduser(@RequestBody User user){
        userService.saveUser(user);
        return "New user is added";
    }
    @PostMapping("/checkuser")
    public ResponseEntity<?> checkUser(@RequestBody User user) {
        User existingUser = userService.findByUsername(user.getUsername());
        if (existingUser != null && existingUser.getPassword().equals(user.getPassword())) {
            return ResponseEntity.ok(existingUser.getId()); // Return the user ID on success
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Incorrect Username/Password");
        }
    }    
}