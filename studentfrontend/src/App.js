import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Appbar from "./components/Appbar";
import Home from "./components/Home";
import Login from "./components/Login"; // Import the User component
import Register from "./components/Register";
import SubmitGrievance from "./components/SubmitGrievance";

const theme = createTheme(); // Create a default MUI theme

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Appbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/SubmitGrievance" element={<SubmitGrievance />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
