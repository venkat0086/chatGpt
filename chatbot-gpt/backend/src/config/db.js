const mongoose = require("mongoose");

const connect = () => {
  //   mongoose.set("strictQuery", false);
  return mongoose.connect(
    "mongodb+srv://venkat:venkat@cluster0.cosjset.mongodb.net/?retryWrites=true&w=majority"
  );
};

module.exports = connect;
