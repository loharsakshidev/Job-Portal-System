package com.example.JobPortalSystem.controller;

import com.example.JobPortalSystem.entity.SavedJob;
import com.example.JobPortalSystem.service.SavedJobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

        import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/saved-jobs")
public class SavedJobController {

    @Autowired
    private SavedJobService savedJobService;

    // Save Job
    @PostMapping("/save")
    public String saveJob(@RequestBody SavedJob savedJob) {

        return savedJobService.saveJob(savedJob);

    }

    // Get Saved Jobs
    @GetMapping("/{userId}")
    public List<SavedJob> getSavedJobs(
            @PathVariable Long userId) {

        return savedJobService.getSavedJobs(userId);

    }

    // Remove Saved Job
    @DeleteMapping("/{userId}/{jobId}")
    public String removeSavedJob(
            @PathVariable Long userId,
            @PathVariable Long jobId) {

        return savedJobService.removeSavedJob(userId, jobId);

    }

}