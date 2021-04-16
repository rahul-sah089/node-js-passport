const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const userModel = require("../models/User");
const User = require("../models/User");
const passport = require("passport");

//Login Page
router.get("/login", (req, res) => {
  res.render("login");
});

//Register Page
router.get("/register", (req, res) => {
  res.render("register");
});

//REgister Handle
router.post("/register", (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];
  //Check required fields
  if (!name || !email || !password || !password2) {
    errors.push({ msg: "Please fill in all fields" });
  }
  if (password2 !== password) {
    errors.push({ msg: "Password do not match" });
  }
  //Check Pass length
  if (password.length < 6) {
    errors.push({ msg: "Password should be atleast 6 characters" });
  }
  if (errors.length > 0) {
    res.render("register", {
      errors,
      name,
      email,
      password,
      password2,
    });
  } else {
    //validation passes
    userModel.findOne({ email: email }).then(user => {
      console.log(user);
      if (user) {
        //User Exist
        errors.push({ msg: "Email is already registered!!" });
        res.render("register", {
          errors,
          name,
          email,
          password,
          password2,
        });
      } else {
        //Bycrt the password and store it in mongo db
        bcrypt.genSalt(10, function (err, salt) {
          bcrypt.hash(password, salt, (err, hash) => {
            const newUser = new User({
              name: name,
              email: email,
              password: hash,
            });
            newUser
              .save()
              .then(user => {
                console.log("User information is");
                console.log(user);
                req.flash(
                  "success_msg",
                  "You are now registered and can log in"
                );
                res.redirect("/users/login");
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});

router.post("/login", (req, res,next) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/users/login",
    failureFlash: true,
  })(req, res, next);
});

router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg","You logged out!!");
  res.redirect("/users/login");
});

module.exports = router;
