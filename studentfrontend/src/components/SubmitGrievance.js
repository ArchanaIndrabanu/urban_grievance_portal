import React, { useState } from "react";
import "../styles/SubmitGrievance.css";

const grievances = [
  { name: "Electricity Issue", formLink: "https://forms.gle/6YDFshr8XWPRpji29" },
  { name: "Water Problem", formLink: "https://forms.gle/LQf4ckmkNR8yuWXV9" },
  { name: "Potholes", formLink: "https://forms.gle/zbN5RxoLw3zVWk2U7" },
  { name: "Dog Problems", formLink: "https://forms.gle/xxiVubQiXreaVxGM7" },
  { name: "Garbage Collection", formLink: "https://forms.gle/your-garbage-form" },
  { name: "Road Repair", formLink: "https://forms.gle/your-roadrepair-form" }
];

function SubmitGrievance() {
  const [selectedForm, setSelectedForm] = useState("");

  return (
    <div className="submit-container">
      <h2>Select a Grievance Type</h2>
      <ul className="grievance-list">
        {grievances.map((grievance, index) => (
          <li key={index} onClick={() => setSelectedForm(grievance.formLink)}>
            {grievance.name}
          </li>
        ))}
      </ul>

      {selectedForm && (
        <div className="form-container">
          <iframe
            src={selectedForm}
            title="Grievance Form"
            width="100%"
            height="600px"
            style={{ border: "none", marginTop: "20px" }}
          />
        </div>
      )}
    </div>
  );
}

export default SubmitGrievance;

