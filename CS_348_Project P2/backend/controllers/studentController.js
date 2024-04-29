const { Student } = require("../models");
const { sequelize } = require("../config/connections.js");

exports.addStudent = async (req, res) => {
  try {
    const { name, grade, courseName } = req.body;

    // create course
    const student = await Student.create({ name, grade, courseName });

    res.status(201).json({ message: "Student added successfully", student });
  } catch (error) {
    console.error("Error adding student:", error);
    res.status(500).json({ message: "Error adding student" });
  }
};

exports.getInsights = async (req, res) => {
  try {
    const { courseName } = req.query;

    // Get insights for the course
    const insights = await Student.findAll({
      where: { courseName },
      attributes: [
        "grade",
        [sequelize.fn("COUNT", sequelize.col("grade")), "count"],
      ],
      group: ["grade"],
    });

    res.status(200).json({ insights });
  } catch (error) {
    console.error("Error fetching insights:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getStudents = async (req, res) => {
  try {
    const { courseName } = req.query;

    // Get insights for the course
    const students = await Student.findAll({
      where: {
        courseName: courseName,
      },
    });

    res.status(200).json({ students });
  } catch (error) {
    console.error("Error fetching insights:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
