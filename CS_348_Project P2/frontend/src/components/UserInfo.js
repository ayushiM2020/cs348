// frontend/src/components/UserInfo.js

import React, { useState, useEffect } from "react";
import axios from "./api";
import CourseForm from "./CourseForm";
import CourseItem from "./CourseItem";

const UserInfo = ({ user }) => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fetch courses for the user
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          `/api/courses?username=${user.username}`
        );
        setCourses(response.data.courses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, [user.username]);

  const handleCourseAdded = (course) => {
    setCourses([...courses, course]);
  };

  const handleCourseUpdated = (updatedCourse) => {
    setCourses(
      courses.map((course) =>
        course.id === updatedCourse.id ? updatedCourse : course
      )
    );
  };

  const handleCourseDeleted = (courseId) => {
    setCourses(courses.filter((course) => course.id !== courseId));
  };

  return (
    <div>
      <h2>Welcome, {user.name}</h2>
      <CourseForm username={user.username} onCourseAdded={handleCourseAdded} />
      <div>
        <h3>My Courses</h3>
        {courses.map((course) => (
          <CourseItem
            key={course.id}
            course={course}
            onUpdate={handleCourseUpdated}
            onDelete={handleCourseDeleted}
          />
        ))}
      </div>
    </div>
  );
};

export default UserInfo;
