/* const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  define: {
    underscored: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
});

module.exports = sequelize; */

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose;
