const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  googleId: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  photo: { type: String },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
