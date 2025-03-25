package com.arjuncodes.studentsystem.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "issue")
public class Issue {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user; // Reference to the User entity

    private String complaintType;
    private String issueDescription;
    private LocalDate preferredResolutionDate;
    private LocalTime preferredResolutionTime;
    
    @Column(nullable = false)
    private String status = "Pending";

    public Issue() {
    }

    public Issue(User user, String complaintType, String issueDescription, LocalDate preferredResolutionDate, 
                 LocalTime preferredResolutionTime, String status) {
        this.user = user;
        this.complaintType = complaintType;
        this.issueDescription = issueDescription;
        this.preferredResolutionDate = preferredResolutionDate;
        this.preferredResolutionTime = preferredResolutionTime;
        this.status = status;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getComplaintType() {
        return complaintType;
    }

    public void setComplaintType(String complaintType) {
        this.complaintType = complaintType;
    }

    public String getIssueDescription() {
        return issueDescription;
    }

    public void setIssueDescription(String issueDescription) {
        this.issueDescription = issueDescription;
    }

    public LocalDate getPreferredResolutionDate() {
        return preferredResolutionDate;
    }

    public void setPreferredResolutionDate(LocalDate preferredResolutionDate) {
        this.preferredResolutionDate = preferredResolutionDate;
    }

    public LocalTime getPreferredResolutionTime() {
        return preferredResolutionTime;
    }

    public void setPreferredResolutionTime(LocalTime preferredResolutionTime) {
        this.preferredResolutionTime = preferredResolutionTime;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}