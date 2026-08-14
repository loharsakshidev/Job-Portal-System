
package com.example.JobPortalSystem.repository;

import com.example.JobPortalSystem.entity.Job;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JobRepository extends JpaRepository<Job, Long> {

    List<Job> findByDeletedFalse();

    long countByStatus(String status);

}