const localStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bycrt = require("bcryptjs");
const passport = require('passport');

const userModel = require("../models/User");

module.exports = function () {
  passport.use(
    new localStrategy({ usernameField: "email" }, (email, password, done) => {
      //match user
      userModel
        .findOne({ email: email })
        .then(user => {
          if (!user) {
            return done(null, false, {
              message: "That email is not registered!!",
            });
          }
          //match password
          bycrt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, {
                message: "Password incorrect!!",
              });
            }
          });
        })
        .catch(err => console.log(err));
    })
  );

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    userModel.findById(id, function (err, user) {
      done(err, user);
    });
  });
};
