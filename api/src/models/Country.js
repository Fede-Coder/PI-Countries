const { DataTypes } = require('sequelize');

function countryModel(database) {
  const Country = database.define('country', {
    //cca3
    id: {
      type: DataTypes.STRING(3),
      allowNull: false,
      primaryKey: true,
    },
    //name.common
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    //flags[0] -> Array
    image: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    //region -> String 
    continent: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    //capital -> Array
    capital: {
      type: DataTypes.STRING,
    },
    //subregion -> String
    subregion: {
      type: DataTypes.STRING,
    },
    //area -> Number
    area: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    //population -> Number
    population: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, { timestamps: false });
  return Country;
}

module.exports = (database) => {
  countryModel(database)
};