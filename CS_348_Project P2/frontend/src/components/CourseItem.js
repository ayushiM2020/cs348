// frontend/src/components/CourseItem.js

import React, { useState } from "react";
import axios from "./api";
import "./CourseItem.css"; // Import CSS file for CourseItem styling

const CourseItem = ({ course, onUpdate, onDelete, onAddStudent }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [editedCourse, setEditedCourse] = useState({ ...course });
  const [isEditing, setIsEditing] = useState(false);
  const [studentName, setStudentName] = useState("");
  const [courseName, setCourseName] = useState("");

  const [studentGrade, setStudentGrade] = useState("");
  const [students, setStudents] = useState([]);
  const [isAddingStudent, setIsAddingStudent] = useState(false);
  const [insights, setInsights] = useState(null);

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleEdit = () => {
    setEditedCourse({ ...course });
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `/api/courses/${course.id}`,
        editedCourse
      );
      onUpdate(response.data.course);
      setIsExpanded(false);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/courses/${course.id}`);
      onDelete(course.id);
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  const handleAddStudent = async () => {
    try {
      const response = await axios.post(`/api/students`, {
        name: studentName,
        grade: studentGrade,
        courseName: editedCourse.courseName,
      });
      setStudents([...students, response.data.student]);
      setStudentName("");
      setStudentGrade("");
      setIsAddingStudent(false); // Close the modal after adding student
      // onAddStudent(response.data.student);
      console.log(response);
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const handleViewInsights = async () => {
    try {
      const response = await axios.get(
        `/api/students?courseName=${course.courseName}`
      );
      setInsights(response.data.insights);
    } catch (error) {
      console.error("Error fetching insights:", error);
    }
  };

  const [showStudents, setShowStudents] = useState(false);
  const [students_all, setStudents_all] = useState([]);

  // Function to handle checkbox change
  const handleCheckboxChange = async (event) => {
    setShowStudents(event.target.checked);
    if (event.target.checked) {
      try {
        const response = await axios.get(
          `/api/students?courseName=${course.courseName}`
        );
        setStudents_all(response.data.students);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    }
  };

  const closeModal = () => {
    setInsights(null);
  };

  return (
    <div className="course-item">
      <div className="course-header" onClick={handleExpand}>
        <h3>{course.courseName}</h3>
        <span className={`toggle-icon ${isExpanded ? "expanded" : ""}`}>▼</span>
      </div>
      {isExpanded && (
        <div className="course-details">
          <p>Term: {course.term}</p>
          <p>Year: {course.year}</p>
          <div className="button-group">
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
            <button onClick={() => setIsAddingStudent(true)}>
              Add Student
            </button>
            <button onClick={handleViewInsights}>View Insights</button>
          </div>
          <div className="students">
            {/* <h4>Students:</h4>
            <ul>
              {students.map((student) => (
                <li key={student.id}>
                  Name: {student.name}, Grade: {student.grade}
                </li>
              ))}
            </ul> */}
          </div>
        </div>
      )}
      {isEditing && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setIsEditing(false)}>
              &times;
            </span>
            <h2>Edit Course</h2>
            <label>Course Name:</label>
            <input
              type="text"
              value={editedCourse.courseName}
              onChange={(e) =>
                setEditedCourse({ ...editedCourse, courseName: e.target.value })
              }
            />
            <label>Term:</label>
            <select
              value={editedCourse.term}
              onChange={(e) =>
                setEditedCourse({ ...editedCourse, term: e.target.value })
              }
            >
              <option value="Spring">Spring</option>
              <option value="Summer">Summer</option>
              <option value="Fall">Fall</option>
            </select>
            <label>Year:</label>
            <input
              type="text"
              value={editedCourse.year}
              onChange={(e) =>
                setEditedCourse({ ...editedCourse, year: e.target.value })
              }
            />
            <button onClick={handleSave}>Save</button>
          </div>
        </div>
      )}
      {isAddingStudent && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setIsAddingStudent(false)}>
              &times;
            </span>
            <h2>Add Student</h2>
            <input
              type="text"
              placeholder="Enter student name"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter student grade"
              value={studentGrade}
              onChange={(e) => setStudentGrade(e.target.value)}
            />
            <button onClick={handleAddStudent}>Add Student</button>
          </div>
        </div>
      )}
      {insights && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h2>Insights</h2>
            {/* <ul>
              {insights.map((insight) => (
                <li key={insight.grade}>
                  {insight.grade}: {insight.count}
                </li>
              ))}
            </ul> */}
            <div className="pie-chart">
              <h4>Insights</h4>
              <div className="chart">
                {insights.map((insight) => (
                  <div
                    key={insight.grade}
                    className="segment"
                    style={{
                      width: `${insight.count * 100}px`,
                      backgroundColor: getRandomColor(),
                    }}
                  >
                    <span>
                      {insight.grade} : {insight.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <input
              type="checkbox"
              checked={showStudents}
              onChange={handleCheckboxChange}
            />
            <label>Show Total Students</label>
            {showStudents && (
              <div>
                <p>
                  Total Students:{" "}
                  {insights.reduce(
                    (total, insight) => total + insight.count,
                    0
                  )}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseItem;
