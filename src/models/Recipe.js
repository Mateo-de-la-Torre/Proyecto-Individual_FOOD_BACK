const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },

    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    image: {
      type: DataTypes.TEXT, 
      allowNull: false,
    },

    summary: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    healthScore: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    steps: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    created: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  
  },
  { timestamps: false });
};
