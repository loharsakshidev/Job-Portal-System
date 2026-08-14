package com.example.JobPortalSystem.entity;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "jobs")
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String companyName;

    private String location;

    private String salary;

    private String skills;

    private String experience;

    private LocalDate applicationDeadline;

    private String status;

    private boolean deleted = false;

    @Column(length = 3000)
    private String description;

    @Column(length = 2000)
    private String responsibilities;

    @Column(length = 2000)
    private String benefits;

    public Job() {
    }

    public Job(Long id,
               String title,
               String companyName,
               String location,
               String salary,
               String skills,
               String experience,
               LocalDate applicationDeadline,
               String status,
               String description,
               String responsibilities,
               String benefits) {

        this.id = id;
        this.title = title;
        this.companyName = companyName;
        this.location = location;
        this.salary = salary;
        this.skills = skills;
        this.experience = experience;
        this.applicationDeadline = applicationDeadline;
        this.status = status;
        this.description = description;
        this.responsibilities = responsibilities;
        this.benefits = benefits;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getSalary() {
        return salary;
    }

    public void setSalary(String salary) {
        this.salary = salary;
    }

    public String getSkills() {
        return skills;
    }

    public void setSkills(String skills) {
        this.skills = skills;
    }

    public String getExperience() {
        return experience;
    }

    public void setExperience(String experience) {
        this.experience = experience;
    }

    public LocalDate getApplicationDeadline() {
        return applicationDeadline;
    }

    public void setApplicationDeadline(LocalDate applicationDeadline) {
        this.applicationDeadline = applicationDeadline;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getResponsibilities() {
        return responsibilities;
    }

    public void setResponsibilities(String responsibilities) {
        this.responsibilities = responsibilities;
    }

    public String getBenefits() {
        return benefits;
    }

    public void setBenefits(String benefits) {
        this.benefits = benefits;
    }

    public boolean isDeleted() {
        return deleted;
    }

    public void setDeleted(boolean deleted) {
        this.deleted = deleted;
    }
}