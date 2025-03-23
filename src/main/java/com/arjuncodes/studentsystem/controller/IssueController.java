package com.arjuncodes.studentsystem.controller;

import com.arjuncodes.studentsystem.model.Issue;
import com.arjuncodes.studentsystem.service.IssueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/issue")
@CrossOrigin
public class IssueController {
    @Autowired
    private IssueService issueService;

    @PostMapping("/submit")
    public ResponseEntity<String> submitIssue(@RequestBody Issue issue) {
        issueService.saveIssue(issue);
        return ResponseEntity.ok("Issue submitted successfully");
    }

    @GetMapping("/all")
    public ResponseEntity<List<Issue>> getAllIssues() {
        return ResponseEntity.ok(issueService.getAllIssues());
    }
}
