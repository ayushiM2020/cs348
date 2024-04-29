// backend/controllers/courseController.js

const { Course } = require("../models");

exports.addCourse = async (req, res) => {
  try {
    const { username, courseName, term, year } = req.body;

    // create course
    const course = await Course.create({ username, courseName, term, year });

    res.status(201).json({ message: "Course added successfully", course });
  } catch (error) {
    console.error("Error adding course:", error);
    res.status(500).json({ message: "Error adding course" });
  }
};

exports.getCoursesByUsername = async (req, res) => {
  try {
    const { username } = req.query;
    const courses = await Course.findAll({ where: { username } });
    res.json({ courses });
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ message: "Error fetching courses" });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { courseName, term, year } = req.body;
    const course = await Course.findByPk(id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    course.courseName = courseName;
    course.term = term;
    course.year = year;
    await course.save();
    res.json({ message: "Course updated successfully", course });
  } catch (error) {
    console.error("Error updating course:", error);
    res.status(500).json({ message: "Error updating course" });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findByPk(id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    await course.destroy();
    res.json({ message: "Course deleted successfully" });
  } catch (error) {
    console.error("Error deleting course:", error);
    res.status(500).json({ message: "Error deleting course" });
  }
};
