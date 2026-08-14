package com.example.JobPortalSystem.service;

import com.example.JobPortalSystem.entity.Notification;
import com.example.JobPortalSystem.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    public void createNotification(Long userId,
                                   String message,
                                   String type) {

        Notification notification = new Notification();

        notification.setUserId(userId);
        notification.setMessage(message);
        notification.setType(type);
        notification.setRead(false);
        notification.setCreatedAt(LocalDateTime.now());

        notificationRepository.save(notification);

    }

    public List<Notification> getNotifications(Long userId) {

        return notificationRepository
                .findByUserIdOrderByCreatedAtDesc(userId);

    }

    public void markAsRead(Long id) {

        Notification notification =
                notificationRepository.findById(id).orElse(null);

        if (notification != null) {

            notification.setRead(true);

            notificationRepository.save(notification);

        }

    }

}