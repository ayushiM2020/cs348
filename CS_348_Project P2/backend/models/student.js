"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Student.init(
    {
      name: DataTypes.STRING,
      grade: DataTypes.STRING,
      courseName: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Student",
      indexes: [
        {
          name: "idx_courseName", // Name of the index
          fields: ["courseName"], // Field(s) to index
        },
      ],
    }
  );
  return Student;
};
