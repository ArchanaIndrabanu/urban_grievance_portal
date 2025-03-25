package com.arjuncodes.studentsystem.controller;

import com.arjuncodes.studentsystem.model.Issue;
import com.arjuncodes.studentsystem.model.User;
import com.arjuncodes.studentsystem.service.IssueService;
import com.arjuncodes.studentsystem.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/issue")
@CrossOrigin
public class IssueController {
    @Autowired
    private IssueService issueService;

    @Autowired
    private UserService userService;

    // Submit an issue with default status "Pending"
    @PostMapping("/submit")
    public ResponseEntity<String> submitIssue(@RequestBody IssueRequest issueRequest) {
        try {
            // Fetch the user by userId from localStorage
            User user = userService.findById(issueRequest.getUserId());
            if (user == null) {
                return ResponseEntity.badRequest().body("User not found");
            }

            // Create a new Issue entity
            Issue issue = new Issue();
            issue.setUser(user);
            issue.setComplaintType(issueRequest.getComplaintType());
            issue.setIssueDescription(issueRequest.getIssueDescription());
            issue.setPreferredResolutionDate(issueRequest.getPreferredResolutionDate());
            issue.setPreferredResolutionTime(issueRequest.getPreferredResolutionTime());
            issue.setStatus("Pending"); // Default status

            // Save the issue
            issueService.saveIssue(issue);
            return ResponseEntity.ok("Issue submitted successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error submitting issue: " + e.getMessage());
        }
    }

    // Get all issues
    @GetMapping("/all")
    public ResponseEntity<List<Issue>> getAllIssues() {
        return ResponseEntity.ok(issueService.getAllIssues());
    }

    // Get issues by userId
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Issue>> getIssuesByUserId(@PathVariable int userId) {
        return ResponseEntity.ok(issueService.getIssuesByUserId(userId));
    }

    // Update issue status
    @PutMapping("/update-status/{id}")
    public ResponseEntity<String> updateIssueStatus(@PathVariable Long id, @RequestParam String status) {
        Optional<Issue> optionalIssue = issueService.getIssueById(id);
        if (optionalIssue.isPresent()) {
            Issue issue = optionalIssue.get();
            issue.setStatus(status);
            issueService.saveIssue(issue);
            return ResponseEntity.ok("Issue status updated successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Get issues by status
    @GetMapping("/status/{status}")
    public ResponseEntity<List<Issue>> getIssuesByStatus(@PathVariable String status) {
        return ResponseEntity.ok(issueService.getIssuesByStatus(status));
    }
}

// DTO to receive issue data from the frontend
class IssueRequest {
    private int userId;
    private String complaintType;
    private String issueDescription;
    private LocalDate preferredResolutionDate;
    private LocalTime preferredResolutionTime;

    // Getters and Setters
    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
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
}