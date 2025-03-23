package com.arjuncodes.studentsystem.model;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "issue")
public class Issue {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String issueId;
    private String fullName;
    private String contactNumber;
    private String email;
    private String address;
    private String complaintType;
    private String issueDescription;
    private Date preferredResolutionTime;
    
    @Column(nullable = false)
    private String status = "Pending"; // Default status

    public Issue() {
    }

    public Issue(String issueId, String fullName, String contactNumber, String email, String address, 
                 String complaintType, String issueDescription, Date preferredResolutionTime, String status) {
        this.issueId = issueId;
        this.fullName = fullName;
        this.contactNumber = contactNumber;
        this.email = email;
        this.address = address;
        this.complaintType = complaintType;
        this.issueDescription = issueDescription;
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

    public String getIssueId() {
        return issueId;
    }

    public void setIssueId(String issueId) {
        this.issueId = issueId;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getContactNumber() {
        return contactNumber;
    }

    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
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

    public Date getPreferredResolutionTime() {
        return preferredResolutionTime;
    }

    public void setPreferredResolutionTime(Date preferredResolutionTime) {
        this.preferredResolutionTime = preferredResolutionTime;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
