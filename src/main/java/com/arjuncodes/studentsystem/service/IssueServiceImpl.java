package com.arjuncodes.studentsystem.service;

import com.arjuncodes.studentsystem.model.Issue;
import com.arjuncodes.studentsystem.repository.IssueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IssueServiceImpl implements IssueService {
    @Autowired
    private IssueRepository issueRepository;

    @Override
    public void saveIssue(Issue issue) {
        issueRepository.save(issue);
    }

    @Override
    public List<Issue> getAllIssues() {
        return issueRepository.findAll();
    }
}
