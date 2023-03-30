require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// const connect = require("./src/config/db");

const userController = require("./src/controllers/User_controller");
// const studentListController = require("./src/controllers/Student_controller");
// const eventListController = require("./src/controllers/Event_controller");
const { register, login } = require("./src/controllers/Auth_controller");

const app = express();
const PORT = process.env.PORT || 8080;

mongoose.set("strictQuery", false);
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

app.use(cors());
app.use(express.json());

app.post("/register", register);
app.post("/login", login);
app.use("/users", userController);

//Connect to the database before listening
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("listening for requests");
  });
});

// app.listen(port, async (req, res) => {
//   try {
//     await connect();
//     console.log(`Listening to ${port}`);
//   } catch (error) {
//     console.log(error);
//   }
// });
