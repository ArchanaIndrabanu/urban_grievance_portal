package com.arjuncodes.studentsystem.controller;

import com.arjuncodes.studentsystem.model.Issue;
import com.arjuncodes.studentsystem.service.IssueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/issue")
@CrossOrigin
public class IssueController {
    @Autowired
    private IssueService issueService;

    // Submit an issue with default status "Pending"
    @PostMapping("/submit")
    public ResponseEntity<String> submitIssue(@RequestBody Issue issue) {
        if (issue.getStatus() == null || issue.getStatus().isEmpty()) {
            issue.setStatus("Pending"); // Default status
        }
        issueService.saveIssue(issue);
        return ResponseEntity.ok("Issue submitted successfully");
    }

    // Get all issues
    @GetMapping("/all")
    public ResponseEntity<List<Issue>> getAllIssues() {
        return ResponseEntity.ok(issueService.getAllIssues());
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
