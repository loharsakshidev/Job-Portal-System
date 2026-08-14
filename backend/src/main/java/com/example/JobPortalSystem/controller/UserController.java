package com.example.JobPortalSystem.controller;

import com.example.JobPortalSystem.dto.LoginRequest;
import com.example.JobPortalSystem.entity.User;
import com.example.JobPortalSystem.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.multipart.MultipartFile;
import jakarta.validation.Valid;

import com.example.JobPortalSystem.dto.ForgotPasswordRequest;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;


    // Register User
    @PostMapping("/register")
    public User registerUser(@Valid @RequestBody User user) {

        return userService.registerUser(user);

    }

    // Get All Users
    @GetMapping("/all")
    public List<User> getAllUsers() {


        return userService.getAllUsers();

    }

    // Login User
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {

        User user = userService.loginUser(
                loginRequest.getEmail(),
                loginRequest.getPassword()
        );

        if (user == null) {

            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid Email or Password");

        }

        return ResponseEntity.ok(user);

    }

    @PostMapping("/forgot-password")
    public String forgotPassword(
            @RequestBody ForgotPasswordRequest request) {

        return userService.forgotPassword(
                request.getEmail(),
                request.getNewPassword()
        );

    }

    // Get User By Id
    @GetMapping("/{id}")
    public User getUser(@PathVariable Long id) {

        return userService.getUserById(id);

    }

    // Update User
    @PutMapping("/update/{id}")
    public String updateUser(@PathVariable Long id,
                             @RequestBody User user) {

        return userService.updateUser(id, user);

    }


    @PostMapping("/upload-profile/{id}")
    public ResponseEntity<?> uploadProfilePicture(
            @PathVariable Long id,
            @RequestParam("file") MultipartFile file) {

        String response = userService.uploadProfilePicture(id, file);

        if (response.equals("User not found") ||
                response.equals("Please select an image") ||
                response.equals("Upload Failed")) {

            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(response);

        }

        return ResponseEntity.ok(response);

    }

    @DeleteMapping("/profile-picture/{id}")
    public ResponseEntity<?> deleteProfilePicture(@PathVariable Long id) {

        try {
            String response = userService.deleteProfilePicture(id);

            if (response.equals("User not found")) {
                return ResponseEntity
                        .status(HttpStatus.NOT_FOUND)
                        .body(response);
            }

            return ResponseEntity.ok(response);

        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Delete failed: " + e.getMessage());
        }
    }


}