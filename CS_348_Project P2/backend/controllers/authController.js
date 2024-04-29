// backend/controllers/authController.js

const { User } = require("../models");
const bcrypt = require("bcrypt");

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find user by username
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(401).json({ message: "Invalid username" });
    }

    // Validate password
    // const validPassword = await bcrypt.compare(password, user.password);
    const validPassword = password === user.password;

    if (!validPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Create session
    req.session.user = {
      id: user.id,
      username: user.username,
      name: user.name,
    };

    // Send success response
    res.status(200).json({
      message: "Login successful",
      user: { id: user.id, username: user.username, name: user.name },
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
