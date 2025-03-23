import React, { useState } from "react";
import { 
  Container, TextField, MenuItem, Button, Typography, Paper 
} from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  maxWidth: 600,
  margin: "auto",
  boxShadow: theme.shadows[5],
  backgroundColor: "#f5f5f5",
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(1.5),
  fontSize: "1.1rem",
}));

function SubmitGrievance() {
  const [formData, setFormData] = useState({
    fullName: "",
    contactNumber: "",
    email: "",
    address: "",
    complaintType: "Power Outage",
    issueDescription: "",
    preferredResolutionTime: "",
    images: null,
  });

  const userId = "U123";
  const issueCategoryIds = {
    "Power Outage": "PO",
    "Voltage Fluctuation": "VF",
    "Damaged Electric Pole": "DEP",
    "Exposed Wires": "EW",
    "Water Problem": "W",
    "Potholes": "P",
    "Dog Problems": "DP",
    "Garbage Collection": "GC",
    "Road Repair": "RR",
  };
  
  const issueCategoryId = issueCategoryIds[formData.complaintType] || "OT"; 
  const issueId = `${userId}${issueCategoryId}${new Date().toISOString().slice(0, 10).replace(/-/g, "")}${Math.floor(Math.random() * 10000)}`;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const issueData = {
      issueId,
      fullName: formData.fullName,
      contactNumber: formData.contactNumber,
      email: formData.email,
      address: formData.address,
      complaintType: formData.complaintType,
      issueDescription: formData.issueDescription,
      preferredResolutionTime: formData.preferredResolutionTime,
      status: "Submitted",
    };

    try {
      const response = await fetch("http://localhost:8080/issue/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(issueData),
      });

      if (response.ok) {
        alert("Grievance submitted successfully!");
        setFormData({
          fullName: "",
          contactNumber: "",
          email: "",
          address: "",
          complaintType: "Power Outage",
          issueDescription: "",
          preferredResolutionTime: "",
          images: null,
        });
      } else {
        alert("Error submitting grievance.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <Container>
      <StyledPaper elevation={6}>
        <Typography variant="h4" align="center" gutterBottom>
          Submit a Grievance
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField fullWidth label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} required margin="normal" variant="outlined"/>
          <TextField fullWidth label="Contact Number" name="contactNumber" value={formData.contactNumber} onChange={handleChange} required margin="normal" variant="outlined"/>
          <TextField fullWidth label="Email Address" name="email" type="email" value={formData.email} onChange={handleChange} required margin="normal" variant="outlined"/>
          <TextField fullWidth label="Address/Location" name="address" value={formData.address} onChange={handleChange} required margin="normal" variant="outlined"/>
          <TextField fullWidth select label="Complaint Type" name="complaintType" value={formData.complaintType} onChange={handleChange} required margin="normal" variant="outlined">
            {Object.keys(issueCategoryIds).map((type) => (
              <MenuItem key={type} value={type}>{type}</MenuItem>
            ))}
          </TextField>
          <TextField fullWidth multiline rows={4} label="Issue Description" name="issueDescription" value={formData.issueDescription} onChange={handleChange} required margin="normal" variant="outlined"/>
          <TextField fullWidth label="Preferred Resolution Time" name="preferredResolutionTime" type="date" value={formData.preferredResolutionTime} onChange={handleChange} margin="normal" variant="outlined" InputLabelProps={{ shrink: true }}/>
          <StyledButton type="submit" fullWidth variant="contained" color="primary">Submit Grievance</StyledButton>
        </form>
      </StyledPaper>
    </Container>
  );
}

export default SubmitGrievance;
