package com.example.JobPortalSystem.dto;

public class DashboardResponse {

    private long totalJobs;
    private long openJobs;
    private long closedJobs;
    private long totalCandidates;

    private long totalApplications;
    private long pendingApplications;
    private long acceptedApplications;

    public DashboardResponse() {
    }

    public DashboardResponse(
            long totalJobs,
            long openJobs,
            long closedJobs,
            long totalCandidates,
            long totalApplications,
            long pendingApplications,
            long acceptedApplications) {

        this.totalJobs = totalJobs;
        this.openJobs = openJobs;
        this.closedJobs = closedJobs;
        this.totalCandidates = totalCandidates;
        this.totalApplications = totalApplications;
        this.pendingApplications = pendingApplications;
        this.acceptedApplications = acceptedApplications;
    }

    public long getTotalJobs() {
        return totalJobs;
    }

    public void setTotalJobs(long totalJobs) {
        this.totalJobs = totalJobs;
    }

    public long getOpenJobs() {
        return openJobs;
    }

    public void setOpenJobs(long openJobs) {
        this.openJobs = openJobs;
    }

    public long getClosedJobs() {
        return closedJobs;
    }

    public void setClosedJobs(long closedJobs) {
        this.closedJobs = closedJobs;
    }

    public long getTotalCandidates() {
        return totalCandidates;
    }

    public void setTotalCandidates(long totalCandidates) {
        this.totalCandidates = totalCandidates;
    }

    public long getTotalApplications() {
        return totalApplications;
    }

    public void setTotalApplications(long totalApplications) {
        this.totalApplications = totalApplications;
    }

    public long getPendingApplications() {
        return pendingApplications;
    }

    public void setPendingApplications(long pendingApplications) {
        this.pendingApplications = pendingApplications;
    }

    public long getAcceptedApplications() {
        return acceptedApplications;
    }

    public void setAcceptedApplications(long acceptedApplications) {
        this.acceptedApplications = acceptedApplications;
    }
}