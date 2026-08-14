package com.example.JobPortalSystem.repository;

import com.example.JobPortalSystem.entity.SavedJob;
import org.springframework.data.jpa.repository.JpaRepository;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.Modifying;

import java.util.List;

public interface SavedJobRepository extends JpaRepository<SavedJob, Long> {

    // Get all saved jobs of a user
    List<SavedJob> findByUserId(Long userId);

    // Check whether a job is already saved
    boolean existsByUserIdAndJobId(Long userId, Long jobId);

    // Delete saved job
    @Transactional
    @Modifying
    void deleteByUserIdAndJobId(Long userId, Long jobId);

}