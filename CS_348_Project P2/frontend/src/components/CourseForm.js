// frontend/src/components/CourseForm.js

import React, { useState } from "react";
import axios from "./api";
import "./CourseForm.css"; // Import CSS file for CourseForm styling

const CourseForm = ({ username, onCourseAdded }) => {
  const [courseName, setCourseName] = useState("");
  const [term, setTerm] = useState("Spring");
  const [year, setYear] = useState(2022); // Default to 2022

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/courses", {
        username,
        courseName,
        term,
        year,
      });
      console.log("Course added successfully:", response.data);
      onCourseAdded(response.data.course); // Notify parent component
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };

  return (
    <div className="course-form-container">
      <h2>Add Course</h2>
      <form onSubmit={handleSubmit} className="course-form">
        <div className="input-group">
          <label>Course Name:</label>
          <input
            type="text"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Term:</label>
          <select
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            required
          >
            <option value="Spring">Spring</option>
            <option value="Summer">Summer</option>
            <option value="Fall">Fall</option>
          </select>
        </div>
        <div className="input-group">
          <label>Year:</label>
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
          >
            {Array.from({ length: 25 }, (_, i) => 2000 + i).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="add-course-button">
          Add Course
        </button>
      </form>
    </div>
  );
};

export default CourseForm;
