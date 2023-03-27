const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const cookieSession = require("cookie-session");
require("dotenv").config();

const app = express();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Set up the User model
const UserSchema = new mongoose.Schema({
  googleId: String,
  displayName: String,
  email: String,
});

const User = mongoose.model("User", UserSchema);

// Set up the Chat model
const ChatSchema = new mongoose.Schema({
  userId: String,
  message: String,
  timestamp: Date,
});

const Chat = mongoose.model("Chat", ChatSchema);

// Set up Passport
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) {
        return done(null, existingUser);
      }
      const user = await new User({
        googleId: profile.id,
        displayName: profile.displayName,
        email: profile.emails[0].value,
      }).save();
      done(null, user);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

// Set up cookies
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY],
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Set up routes
app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google"),
  (req, res) => {
    res.redirect("/");
  }
);

app.get("/api/current_user", (req, res) => {
  res.send(req.user);
});

app.get("/api/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

// Set up chats route
app.get("/api/chats", async (req, res) => {
  if (!req.user) {
    return res.status(401).send({ error: "You must be logged in." });
  }
  const chats = await Chat.find({ userId: req.user.id });
  res.send(chats);
});

app.post("/api/chats", async (req, res) => {
  const { message } = req.body;
  const chat = await new Chat({
    user: req.user._id,
    message,
  }).save();
  res.send(chat);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
