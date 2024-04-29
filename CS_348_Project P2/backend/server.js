// app.js or server.js

const express = require("express");
const session = require("express-session");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const courseRoutes = require("./routes/courseRoutes");
const studentRoutes = require("./routes/studentRoutes");

const app = express();

app.use(
  session({
    secret: "Hi",
    resave: false,
    saveUninitialized: false,
  })
);

// CORS middleware
app.use(cors());

// Body parsing middleware
app.use(express.json());

// User routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/students", studentRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
