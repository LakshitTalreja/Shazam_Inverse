const express = require("express");
const cors = require("cors");
const session = require("express-session");
require("dotenv").config();

const passport = require("./config/passport");
const connectDB = require("./config/db");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// --- Routes ---
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// GOOGLE AUTH ROUTES
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/auth/fail" }),
  (req, res) => {
    res.send("Google Login Successful!");
  }
);

// Check logged-in user
app.get("/auth/user", (req, res) => {
  if (!req.user) return res.json({ loggedIn: false });

  res.json({
    loggedIn: true,
    user: req.user,
  });
});

app.get("/auth/fail", (req, res) => {
  res.send("Failed to authenticate.");
});

// --- CONNECT TO DATABASE, THEN START SERVER ---
connectDB().then(() => {
  app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on port ${process.env.PORT || 3000}`);
  });
});

