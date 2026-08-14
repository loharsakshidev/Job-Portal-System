package com.example.JobPortalSystem.service;

import com.example.JobPortalSystem.entity.User;
import com.example.JobPortalSystem.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.springframework.beans.factory.annotation.Value;

import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.IOException;
import java.util.UUID;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Value("${file.upload-dir}")
    private String uploadDir;

    // Register User
    public User registerUser(User user) {
        return userRepository.save(user);
    }

    // Get All Users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Login User
    public User loginUser(String email, String password) {
        return userRepository.findByEmailAndPassword(email, password);
    }

    // Get User by ID
    public User getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    // Update User
    public String updateUser(Long id, User updatedUser) {

        User user = userRepository.findById(id).orElse(null);

        if (user == null) {
            return "User not found";
        }

        user.setName(updatedUser.getName());

        if (updatedUser.getPassword() != null &&
                !updatedUser.getPassword().isEmpty()) {

            user.setPassword(updatedUser.getPassword());

        }

        userRepository.save(user);

        return "Profile Updated Successfully";

    }

    // Forgot Password
    public String forgotPassword(String email, String newPassword) {

        User user = userRepository.findByEmail(email);

        if (user == null) {
            return "Email not found";
        }

        user.setPassword(newPassword);

        userRepository.save(user);

        return "Password Updated Successfully";

    }

    public String uploadProfilePicture(Long id, MultipartFile file) {

        User user = userRepository.findById(id).orElse(null);

        if (user == null) {
            return "User not found";
        }

        if (file.isEmpty()) {
            return "Please select an image";
        }

        try {

            File folder = new File(uploadDir);

            if (!folder.exists()) {
                folder.mkdirs();
            }

            String fileName =
                    UUID.randomUUID() + "_" + file.getOriginalFilename();

            File destination = new File(uploadDir, fileName);

            file.transferTo(destination);

            user.setProfilePicture(fileName);

            userRepository.save(user);

            return fileName;

        } catch (IOException e) {

            e.printStackTrace();

            return "Upload Failed";
        }
    }

    public String deleteProfilePicture(Long id) {

        User user = userRepository.findById(id).orElse(null);

        if (user == null) {
            return "User not found";
        }

        String fileName = user.getProfilePicture();

        // Delete physical image file
        if (fileName != null && !fileName.isEmpty()) {

            File file = new File(uploadDir, fileName);

            if (file.exists()) {
                boolean deleted = file.delete();

                if (!deleted) {
                    System.out.println("Unable to delete file: " + file.getAbsolutePath());
                }
            }
        }

        // Remove profile picture reference from database
        user.setProfilePicture(null);

        userRepository.save(user);

        return "Profile Picture Removed";
    }

}