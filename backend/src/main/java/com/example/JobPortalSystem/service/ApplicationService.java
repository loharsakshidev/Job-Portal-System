package com.example.JobPortalSystem.service;

import com.example.JobPortalSystem.dto.ApplicationResponse;
import com.example.JobPortalSystem.dto.AppliedJobResponse;
import com.example.JobPortalSystem.entity.Application;
import com.example.JobPortalSystem.entity.Job;
import com.example.JobPortalSystem.entity.User;
import com.example.JobPortalSystem.repository.ApplicationRepository;
import com.example.JobPortalSystem.repository.JobRepository;
import com.example.JobPortalSystem.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.multipart.MultipartFile;
import com.example.JobPortalSystem.service.NotificationService;


import java.io.File;
import java.io.IOException;
import java.util.UUID;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class ApplicationService {

    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private NotificationService notificationService;

    @Value("${resume.upload-dir}")
    private String resumeUploadDir;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JobRepository jobRepository;

    // Apply for Job
    public Application applyJob(Application application) {

        Job job = jobRepository.findById(application.getJobId()).orElse(null);

        if (job == null) {

            System.out.println("❌ Job Not Found");

            return null;

        }

        if (LocalDate.now().isAfter(job.getApplicationDeadline())) {

            System.out.println("❌ Deadline Expired");

            return null;

        }

        boolean alreadyApplied =
                applicationRepository.existsByUserIdAndJobId(
                        application.getUserId(),
                        application.getJobId());

        if (alreadyApplied) {

            System.out.println("❌ Already Applied");

            return null;

        }

        application.setAppliedDate(LocalDate.now());
        application.setStatus("PENDING");

        System.out.println("✅ Application Saved");

        return applicationRepository.save(application);

    }
    // Recruiter View Applications
    public List<ApplicationResponse> getAllApplications() {

        List<Application> applications = applicationRepository.findAll();

        List<ApplicationResponse> responseList = new ArrayList<>();

        for (Application application : applications) {

            User user =
                    userRepository.findById(application.getUserId()).orElse(null);

            Job job =
                    jobRepository.findById(application.getJobId()).orElse(null);

            ApplicationResponse response =
                    new ApplicationResponse();

            response.setApplicationId(application.getId());

            response.setAppliedDate(application.getAppliedDate());

            response.setStatus(application.getStatus());

            response.setResume(application.getResume());

            if (user != null) {

                response.setCandidateName(user.getName());

                response.setCandidateEmail(user.getEmail());

            }

            if (job != null) {

                response.setJobTitle(job.getTitle());

                response.setCompanyName(job.getCompanyName());

            } else {

                response.setJobTitle("Job Deleted");

                response.setCompanyName("-");

            }

            responseList.add(response);

        }

        return responseList;

    }

    // Candidate View Applied Jobs
    public List<AppliedJobResponse> getApplicationsByUser(Long userId) {

        List<Application> applications =
                applicationRepository.findByUserId(userId);

        List<AppliedJobResponse> responseList =
                new ArrayList<>();

        for (Application application : applications) {

            Job job =
                    jobRepository.findById(application.getJobId()).orElse(null);

            AppliedJobResponse response =
                    new AppliedJobResponse();

            response.setApplicationId(application.getId());

            response.setAppliedDate(application.getAppliedDate());

            response.setStatus(application.getStatus());

            if (job != null) {

                response.setJobTitle(job.getTitle());

                response.setCompanyName(job.getCompanyName());

                response.setLocation(job.getLocation());

                response.setSalary(job.getSalary());

            } else {

                response.setJobTitle("Job Deleted");

                response.setCompanyName("-");

                response.setLocation("-");

                response.setSalary("-");

            }

            responseList.add(response);

        }

        return responseList;

    }

    // Applications By Job
    public List<Application> getApplicationsByJob(Long jobId) {

        return applicationRepository.findByJobId(jobId);

    }

    // Update Status
    public String updateApplicationStatus(Long id, String status) {

        Application application =
                applicationRepository.findById(id).orElse(null);

        if (application == null) {

            return "Application not found.";

        }

        application.setStatus(status);

        applicationRepository.save(application);

        Job job =
                jobRepository.findById(application.getJobId()).orElse(null);

        String jobTitle =
                job != null ? job.getTitle() : "Job";

        String message;

        String type;

        if (status.equals("ACCEPTED")) {

            message =
                    "🎉 Congratulations! Your application for \"" +
                            jobTitle +
                            "\" has been accepted.";

            type = "SUCCESS";

        }

        else {

            message =
                    "❌ Your application for \"" +
                            jobTitle +
                            "\" has been rejected.";

            type = "ERROR";

        }

        notificationService.createNotification(

                application.getUserId(),
                message,
                type

        );

        return "Application Status Updated Successfully";

    }

    public String uploadResume(Long applicationId,
                               MultipartFile file) {

        Application application =
                applicationRepository
                        .findById(applicationId)
                        .orElse(null);

        if (application == null) {

            return "Application Not Found";

        }

        if (file.isEmpty()) {

            return "Please Select Resume";

        }

        try {

            File folder = new File(resumeUploadDir);

            if (!folder.exists()) {

                folder.mkdirs();

            }

            String fileName =
                    UUID.randomUUID()
                            + "_"
                            + file.getOriginalFilename();

            File destination =
                    new File(folder, fileName);

            file.transferTo(destination);

            application.setResume(fileName);

            applicationRepository.save(application);

            return fileName;

        }

        catch (IOException e) {

            e.printStackTrace();

            return "Resume Upload Failed";

        }

    }

    public boolean hasApplied(Long userId, Long jobId) {

        return applicationRepository.existsByUserIdAndJobId(
                userId,
                jobId
        );

    }

}