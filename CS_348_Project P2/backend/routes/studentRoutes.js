// backend/routes/courseRoutes.js

const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");

router.post("/", studentController.addStudent);
router.get("/", studentController.getInsights); // New route for fetching courses
router.get("/", studentController.getStudents); // New route for fetching courses

module.exports = router;
