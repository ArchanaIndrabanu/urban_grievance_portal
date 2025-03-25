package com.arjuncodes.studentsystem.service;

import com.arjuncodes.studentsystem.model.Issue;

import java.util.List;
import java.util.Optional;

public interface IssueService {
    void saveIssue(Issue issue);
    List<Issue> getAllIssues();
    Optional<Issue> getIssueById(Long id);
    List<Issue> getIssuesByStatus(String status);
    List<Issue> getIssuesByUserId(int userId); // Added to fetch issues by userId
}