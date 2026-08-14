package com.example.JobPortalSystem.service;

import com.example.JobPortalSystem.entity.Job;
import com.example.JobPortalSystem.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class JobService {

    @Autowired
    private JobRepository jobRepository;

    // Add Job
//    public Job addJob(Job job) {
//        return jobRepository.save(job);
//    }

    public Job addJob(Job job) {

        job.setStatus("OPEN");

        return jobRepository.save(job);
    }

    // Get All Jobs
    public List<Job> getAllJobs() {

        return jobRepository.findByDeletedFalse();

    }

    // Get Job By Id
    public Optional<Job> getJobById(Long id) {
        return jobRepository.findById(id);
    }

    // Update Job
    public Job updateJob(Long id, Job updatedJob) {

        Job existingJob = jobRepository.findById(id).orElse(null);

        if (existingJob != null) {

            existingJob.setTitle(updatedJob.getTitle());
            existingJob.setCompanyName(updatedJob.getCompanyName());
            existingJob.setLocation(updatedJob.getLocation());
            existingJob.setSalary(updatedJob.getSalary());
            existingJob.setExperience(updatedJob.getExperience());
            existingJob.setDescription(updatedJob.getDescription());
            existingJob.setSkills(updatedJob.getSkills());
           // existingJob.setJobType(updatedJob.getJobType());

            return jobRepository.save(existingJob);
        }

        return null;
    }

    // Delete Job
    public String deleteJob(Long id) {

        Job job = jobRepository.findById(id).orElse(null);

        if (job == null) {

            return "Job Not Found";

        }

        job.setDeleted(true);

        job.setStatus("CLOSED");

        jobRepository.save(job);

        return "Job Closed Successfully";

    }

    public String reopenJob(Long id) {

        Job job = jobRepository.findById(id).orElse(null);

        if (job == null) {
            return "Job Not Found";
        }

        job.setDeleted(false);
        job.setStatus("OPEN");

        jobRepository.save(job);

        return "Job Reopened Successfully";
    }

    public String closeJob(Long id) {

        Optional<Job> optionalJob = jobRepository.findById(id);

        if (optionalJob.isPresent()) {

            Job job = optionalJob.get();

            job.setStatus("CLOSED");

            jobRepository.save(job);

            return "Job Closed Successfully";

        }

        return "Job Not Found";

    }
}