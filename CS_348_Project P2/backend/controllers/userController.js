// controllers/userController.js

const { User } = require("../models");

exports.createUser = async (req, res) => {
  try {
    transaction = await sequelize.transaction({
      isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED,
    });

    const { username, password, name } = req.body;

    // Create user record
    const user = await User.create({ username, password, name });

    // Send success response
    res.status(201).json({ message: "User created successfully", user });
    console.log("User created");

    await transaction.commit();
  } catch (error) {
    // Handle errors

    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error" });

    if (transaction) await transaction.rollback();
    throw error;
  }
};
