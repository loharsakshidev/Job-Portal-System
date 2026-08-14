package com.example.JobPortalSystem.dto;

import java.time.LocalDate;

public class ApplicationResponse {

    private Long applicationId;
    private String candidateName;
    private String candidateEmail;
    private String jobTitle;
    private String companyName;
    private LocalDate appliedDate;
    private String status;
    private String resume;

    public ApplicationResponse() {
    }

    public ApplicationResponse(Long applicationId,
                               String candidateName,
                               String candidateEmail,
                               String jobTitle,
                               String companyName,
                               LocalDate appliedDate,
                               String status) {

        this.applicationId = applicationId;
        this.candidateName = candidateName;
        this.candidateEmail = candidateEmail;
        this.jobTitle = jobTitle;
        this.companyName = companyName;
        this.appliedDate = appliedDate;
        this.status = status;
    }

    public Long getApplicationId() {
        return applicationId;
    }

    public void setApplicationId(Long applicationId) {
        this.applicationId = applicationId;
    }

    public String getCandidateName() {
        return candidateName;
    }

    public void setCandidateName(String candidateName) {
        this.candidateName = candidateName;
    }

    public String getCandidateEmail() {
        return candidateEmail;
    }

    public void setCandidateEmail(String candidateEmail) {
        this.candidateEmail = candidateEmail;
    }

    public String getJobTitle() {
        return jobTitle;
    }

    public void setJobTitle(String jobTitle) {
        this.jobTitle = jobTitle;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public LocalDate getAppliedDate() {
        return appliedDate;
    }

    public void setAppliedDate(LocalDate appliedDate) {
        this.appliedDate = appliedDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getResume() {
        return resume;
    }

    public void setResume(String resume) {
        this.resume = resume;
    }
}