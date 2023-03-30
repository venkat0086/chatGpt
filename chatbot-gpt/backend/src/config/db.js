const { config } = require("dotenv");
const mongoose = require("mongoose");
config();

const connect = () => {
  //   mongoose.set("strictQuery", false);
  return mongoose.connect(process.env.MONGODB_URI);
};

module.exports = connect;
