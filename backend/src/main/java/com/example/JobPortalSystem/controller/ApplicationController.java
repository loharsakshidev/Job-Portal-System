package com.example.JobPortalSystem.controller;

import com.example.JobPortalSystem.dto.ApplicationResponse;
import com.example.JobPortalSystem.dto.AppliedJobResponse;
import com.example.JobPortalSystem.entity.Application;
import com.example.JobPortalSystem.service.ApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;

import org.springframework.beans.factory.annotation.Value;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.io.IOException;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/applications")
public class ApplicationController {

    @Autowired
    private ApplicationService applicationService;

    @Value("${resume.upload-dir}")
    private String resumeUploadDir;

    // Apply for Job
    @PostMapping("/apply")
    public ResponseEntity<?> applyForJob(
            @RequestBody Application application) {

        Application savedApplication =
                applicationService.applyJob(application);

        if (savedApplication == null) {

            return ResponseEntity.badRequest()
                    .body("Already Applied");

        }

        return ResponseEntity.ok(savedApplication);

    }

    // Get All Applications (Recruiter)
    @GetMapping("/all")
    public List<ApplicationResponse> getAllApplications() {

        return applicationService.getAllApplications();

    }

    // Get Applications By User (Candidate)
    @GetMapping("/user/{userId}")
    public List<AppliedJobResponse> getApplicationsByUser(
            @PathVariable Long userId) {

        return applicationService.getApplicationsByUser(userId);

    }

    // Get Applications By Job
    @GetMapping("/job/{jobId}")
    public List<Application> getApplicationsByJob(
            @PathVariable Long jobId) {

        return applicationService.getApplicationsByJob(jobId);

    }

    // Update Status
    @PutMapping("/status/{id}")
    public String updateApplicationStatus(
            @PathVariable Long id,
            @RequestParam String status) {

        return applicationService.updateApplicationStatus(id, status);

    }

    @PostMapping("/upload-resume/{applicationId}")
    public String uploadResume(
            @PathVariable Long applicationId,
            @RequestParam("file") MultipartFile file) {

        return applicationService.uploadResume(
                applicationId,
                file
        );

    }

    @GetMapping("/resume/{fileName:.+}")
    public ResponseEntity<Resource> downloadResume(
            @PathVariable String fileName)
            throws IOException {

        Path filePath = Paths.get(resumeUploadDir)
                .resolve(fileName)
                .normalize();

        Resource resource = new UrlResource(filePath.toUri());

        if (!resource.exists() || !resource.isReadable()) {

            return ResponseEntity.notFound().build();

        }

        return ResponseEntity.ok()
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" +
                                resource.getFilename() + "\""
                )
                .body(resource);

    }

    @GetMapping("/check/{userId}/{jobId}")
    public boolean hasApplied(
            @PathVariable Long userId,
            @PathVariable Long jobId) {

        return applicationService.hasApplied(
                userId,
                jobId
        );

    }

}