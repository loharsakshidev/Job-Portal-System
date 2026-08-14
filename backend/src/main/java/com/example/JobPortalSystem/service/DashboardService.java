package com.example.JobPortalSystem.service;

import com.example.JobPortalSystem.dto.DashboardResponse;
import com.example.JobPortalSystem.repository.ApplicationRepository;
import com.example.JobPortalSystem.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DashboardService {

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private ApplicationRepository applicationRepository;

    public DashboardResponse getDashboardData() {

        DashboardResponse response = new DashboardResponse();

        response.setTotalJobs(jobRepository.count());

        response.setOpenJobs(
                jobRepository.countByStatus("OPEN")
        );

        response.setClosedJobs(
                jobRepository.countByStatus("CLOSED")
        );

        response.setTotalCandidates(
                applicationRepository.count()
        );

        response.setTotalJobs(jobRepository.count());

        response.setOpenJobs(jobRepository.countByStatus("OPEN"));
        response.setClosedJobs(jobRepository.countByStatus("CLOSED"));

        response.setTotalCandidates(applicationRepository.count());

        response.setTotalApplications(applicationRepository.count());
        response.setPendingApplications(
                applicationRepository.countByStatus("PENDING"));
        response.setAcceptedApplications(
                applicationRepository.countByStatus("ACCEPTED"));

        return response;
    }

}