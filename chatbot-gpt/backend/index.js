require("dotenv").config();
const express = require("express");
const cors = require("cors");

const connect = require("./src/config/db");

const userController = require("./src/controllers/User_controller");
// const studentListController = require("./src/controllers/Student_controller");
// const eventListController = require("./src/controllers/Event_controller");
const { register, login } = require("./src/controllers/Auth_controller");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/register", register);
app.post("/login", login);
app.use("/users", userController);

const port = process.env.PORT || 8080;

app.listen(port, async (req, res) => {
  try {
    await connect();
    console.log(`Listening to ${port}`);
  } catch (error) {
    console.log(error);
  }
});
