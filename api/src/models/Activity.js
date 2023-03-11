const { DataTypes } = require('sequelize');

function activityModel(database) {
  const Activity = database.define('activity', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    difficulty: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [1, 5]
      }
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    season: {
      type: DataTypes.ENUM('Summer', 'Fall', 'Winter', 'Spring'),
      allowNull: false,
    },
  }, { timestamps: false });
  return Activity;
}

module.exports = (database) => {
    activityModel(database)
};
