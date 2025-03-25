import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableRow, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel, 
  Button, 
  Paper, 
  Grid 
} from '@mui/material';

export default function Dashboard() {
  const [issues, setIssues] = useState([]);
  const [filteredIssues, setFilteredIssues] = useState([]);
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [error, setError] = useState('');
  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("userName");

  // Fetch issues when the component mounts
  useEffect(() => {
    if (!userId) {
      setError("User not logged in. Please log in to view your dashboard.");
      return;
    }

    const fetchIssues = async () => {
      try {
        const response = await fetch(`http://localhost:8080/issue/user/${userId}`);
        if (response.ok) {
          const data = await response.json();
          setIssues(data);
          setFilteredIssues(data); // Initially show all issues
        } else {
          setError("Failed to fetch issues.");
        }
      } catch (err) {
        setError("Server error. Please try again later.");
      }
    };

    fetchIssues();
  }, [userId]);

  // Filter issues based on status
  useEffect(() => {
    if (statusFilter === 'All') {
      setFilteredIssues(issues);
    } else {
      setFilteredIssues(issues.filter(issue => issue.status === statusFilter));
    }
    setSelectedIssue(null); // Reset selected issue when filter changes
  }, [statusFilter, issues]);

  // Handle issue click to display details
  const handleIssueClick = (issue) => {
    setSelectedIssue(issue);
  };

  // Placeholder functions for Close, Withdraw, and Reopen
  const handleClose = (issueId) => {
    console.log(`Close issue with ID: ${issueId}`);
    // Functionality to be implemented later
  };

  const handleWithdraw = (issueId) => {
    console.log(`Withdraw issue with ID: ${issueId}`);
    // Functionality to be implemented later
  };

  const handleReopen = (issueId) => {
    console.log(`Reopen issue with ID: ${issueId}`);
    // Functionality to be implemented later
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Box>
        <Typography variant="h4" gutterBottom>
          Welcome to Your Dashboard, {userName}!
        </Typography>
        <Typography variant="h6" gutterBottom>
          View and manage your grievances below.
        </Typography>

        {/* Status Filter */}
        <FormControl sx={{ mb: 2, minWidth: 200 }}>
          <InputLabel>Filter by Status</InputLabel>
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            label="Filter by Status"
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
          </Select>
        </FormControl>

        {/* Error Message */}
        {error ? (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        ) : filteredIssues.length === 0 ? (
          <Typography sx={{ mt: 2 }}>
            No issues found for the selected status.
          </Typography>
        ) : (
          <>
            {/* Issues Table */}
            <Table sx={{ mt: 2 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Complaint Type</TableCell>
                  <TableCell>Issue Description</TableCell>
                  <TableCell>Preferred Resolution Date</TableCell>
                  <TableCell>Preferred Resolution Time</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredIssues.map((issue) => (
                  <TableRow 
                    key={issue.id} 
                    onClick={() => handleIssueClick(issue)} 
                    sx={{ cursor: 'pointer', '&:hover': { backgroundColor: '#f5f5f5' } }}
                  >
                    <TableCell>{issue.complaintType}</TableCell>
                    <TableCell>{issue.issueDescription}</TableCell>
                    <TableCell>{issue.preferredResolutionDate}</TableCell>
                    <TableCell>{issue.preferredResolutionTime}</TableCell>
                    <TableCell>{issue.status}</TableCell>
                    <TableCell>
                      <Button 
                        variant="outlined" 
                        size="small" 
                        onClick={(e) => { e.stopPropagation(); handleClose(issue.id); }}
                        sx={{ mr: 1 }}
                      >
                        Close
                      </Button>
                      <Button 
                        variant="outlined" 
                        size="small" 
                        onClick={(e) => { e.stopPropagation(); handleWithdraw(issue.id); }}
                        sx={{ mr: 1 }}
                      >
                        Withdraw
                      </Button>
                      <Button 
                        variant="outlined" 
                        size="small" 
                        onClick={(e) => { e.stopPropagation(); handleReopen(issue.id); }}
                      >
                        Reopen
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Issue Details */}
            {selectedIssue && (
              <Paper elevation={3} sx={{ mt: 4, p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Issue Details
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography><strong>Complaint Type:</strong> {selectedIssue.complaintType}</Typography>
                    <Typography><strong>Issue Description:</strong> {selectedIssue.issueDescription}</Typography>
                    <Typography><strong>Preferred Resolution Date:</strong> {selectedIssue.preferredResolutionDate}</Typography>
                    <Typography><strong>Preferred Resolution Time:</strong> {selectedIssue.preferredResolutionTime}</Typography>
                    <Typography><strong>Status:</strong> {selectedIssue.status}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography><strong>Full Name:</strong> {selectedIssue.user.name}</Typography>
                    <Typography><strong>Contact Number:</strong> {selectedIssue.user.contactNumber}</Typography>
                    <Typography><strong>Email:</strong> {selectedIssue.user.email}</Typography>
                    <Typography><strong>Address:</strong> {selectedIssue.user.address}</Typography>
                  </Grid>
                </Grid>
              </Paper>
            )}
          </>
        )}
      </Box>
    </Container>
  );
}