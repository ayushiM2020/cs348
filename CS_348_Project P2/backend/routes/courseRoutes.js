// backend/routes/courseRoutes.js

const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");

router.post("/", courseController.addCourse);
router.get("/", courseController.getCoursesByUsername); // New route for fetching courses
router.put("/:id", courseController.updateCourse); // Route for updating course
router.delete("/:id", courseController.deleteCourse); // Route for deleting course

module.exports = router;
