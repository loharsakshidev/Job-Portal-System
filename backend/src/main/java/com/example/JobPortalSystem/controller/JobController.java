package com.example.JobPortalSystem.controller;

import com.example.JobPortalSystem.entity.Job;
import com.example.JobPortalSystem.service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/jobs")
public class JobController {

    @Autowired
    private JobService jobService;

    // Add Job
    @PostMapping("/add")
    public Job addJob(@RequestBody Job job) {
        return jobService.addJob(job);
    }

    // Get All Jobs
    @GetMapping("/all")
    public List<Job> getAllJobs() {
        return jobService.getAllJobs();
    }

    // Get Job By ID
    @GetMapping("/{id}")
    public Optional<Job> getJobById(@PathVariable Long id) {
        return jobService.getJobById(id);
    }

    // Update Job
    @PutMapping("/update/{id}")
    public Job updateJob(@PathVariable Long id,
                         @RequestBody Job updatedJob) {

        return jobService.updateJob(id, updatedJob);

    }

    // Delete Job
    @DeleteMapping("/delete/{id}")
    public String deleteJob(@PathVariable Long id) {
        return jobService.deleteJob(id);
    }

    @PutMapping("/reopen/{id}")
    public String reopenJob(@PathVariable Long id) {

        return jobService.reopenJob(id);

    }

    @PutMapping("/close/{id}")
    public String closeJob(@PathVariable Long id) {

        return jobService.closeJob(id);

    }
}