package com.example.JobPortalSystem.service;

import com.example.JobPortalSystem.entity.SavedJob;
import com.example.JobPortalSystem.repository.SavedJobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SavedJobService {

    @Autowired
    private SavedJobRepository savedJobRepository;

    // Save Job
    public String saveJob(SavedJob savedJob) {

        boolean exists = savedJobRepository.existsByUserIdAndJobId(
                savedJob.getUserId(),
                savedJob.getJobId()
        );

        if (exists) {
            return "Job already saved";
        }

        savedJobRepository.save(savedJob);

        return "Job saved successfully";
    }

    // Get Saved Jobs
    public List<SavedJob> getSavedJobs(Long userId) {

        return savedJobRepository.findByUserId(userId);

    }

    // Remove Saved Job
    public String removeSavedJob(Long userId, Long jobId) {

        savedJobRepository.deleteByUserIdAndJobId(userId, jobId);

        return "Saved job removed successfully";

    }

}