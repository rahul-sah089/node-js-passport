const express = require("express");
const passport = require("passport");
const authRoute = express.Router();

//@Desc Auth with Google
//@route GET /auth/google
authRoute.get(
  "/google",
  passport.authenticate("google", { scope: ["profile"] })
);
//@Desc Google Auth callback
//@route GET /auth/google/callback

authRoute.get(
  "/  google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/");
  }
);

module.exports = authRoute;
