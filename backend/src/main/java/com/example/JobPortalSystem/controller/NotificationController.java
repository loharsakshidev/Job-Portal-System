package com.example.JobPortalSystem.controller;

import com.example.JobPortalSystem.entity.Notification;
import com.example.JobPortalSystem.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

        import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @GetMapping("/{userId}")
    public List<Notification> getNotifications(
            @PathVariable Long userId) {

        return notificationService.getNotifications(userId);

    }

    @PutMapping("/read/{id}")
    public String markAsRead(
            @PathVariable Long id) {

        notificationService.markAsRead(id);

        return "Notification Read";

    }

}