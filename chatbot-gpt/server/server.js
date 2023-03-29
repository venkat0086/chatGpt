const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const cookieSession = require("cookie-session");
const cors = require("cors");
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
      scope: ["profile", "email"],
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

app.use(cors());

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

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

app.get(
  "/auth/google/callback",
  passport.authenticate("google"),
  (req, res) => {
    res.redirect("/");
  }
);

app.get("/api/current_user", (req, res) => {
  console.log(req.user);
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

// const express = require("express");
// const passport = require("passport");
// const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const JwtStrategy = require("passport-jwt").Strategy;
// const ExtractJwt = require("passport-jwt").ExtractJwt;
// const jwt = require("jsonwebtoken");
// const mongoose = require("mongoose");
// require("dotenv").config();

// const app = express();

// // Define User model
// const User = mongoose.model("User", {
//   googleId: String,
//   displayName: String,
//   accessToken: String,
//   refreshToken: String,
// });

// // Set up Passport with the Google OAuth strategy
// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: "/auth/google/callback",
//       scope: ["profile", "email"],
//     },
//     (accessToken, refreshToken, profile, done) => {
//       User.findOne({ googleId: profile.id }, (err, user) => {
//         if (err) {
//           return done(err);
//         }
//         if (!user) {
//           const newUser = new User({
//             googleId: profile.id,
//             displayName: profile.displayName,
//             accessToken: accessToken,
//             refreshToken: refreshToken,
//           });
//           newUser.save((err) => {
//             if (err) {
//               return done(err);
//             }
//             done(null, newUser);
//           });
//         } else {
//           user.accessToken = accessToken;
//           user.refreshToken = refreshToken;
//           user.save((err) => {
//             if (err) {
//               return done(err);
//             }
//             done(null, user);
//           });
//         }
//       });
//     }
//   )
// );

// // Set up Passport with JWT strategy for access token
// passport.use(
//   "jwt",
//   new JwtStrategy(
//     {
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       secretOrKey: process.env.JWT_SECRET_KEY,
//     },
//     (jwtPayload, done) => {
//       User.findById(jwtPayload.sub, (err, user) => {
//         if (err) {
//           return done(err, false);
//         }
//         if (user) {
//           done(null, user);
//         } else {
//           done(null, false);
//         }
//       });
//     }
//   )
// );

// // Routes

// // Login with Google OAuth
// app.get(
//   "/auth/google",
//   passport.authenticate("google", { scope: ["profile", "email"] })
// );

// // Callback after Google OAuth login
// app.get(
//   "/auth/google/callback",
//   passport.authenticate("google", { session: false }),
//   (req, res) => {
//     // Create access token with JWT
//     const accessToken = jwt.sign(
//       { sub: req.user._id },
//       process.env.JWT_SECRET_KEY,
//       {
//         expiresIn: "1h",
//       }
//     );
//     // Send access token and refresh token in response
//     res.json({ accessToken: accessToken, refreshToken: req.user.refreshToken });
//   }
// );

// // Refresh access token
// app.post(
//   "/auth/refresh",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     // Create new access token with JWT
//     const accessToken = jwt.sign(
//       { sub: req.user._id },
//       process.env.JWT_SECRET_KEY,
//       {
//         expiresIn: "1h",
//       }
//     );
//     // Send new access token in response
//     res.json({ accessToken: accessToken });
//   }
// );

// // Start server
// mongoose
//   .connect(process.env.MONGODB_URI)
//   .then(() => {
//     console.log("MongoDB connected");
//     app.listen(8080, () => {
//       console.log("Server listening on port 8080");
//     });
//   })
//   .catch((err) => console.error(err));
