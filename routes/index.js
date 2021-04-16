const express = require("express");

const router = express.Router();

const { ensureAuthicated } = require("../config/auth");

router.get("/", (req, res) => {
  res.render("welcome");
});

router.get("/dashboard", ensureAuthicated, (req, res) => {
  res.render("dashboard", {
    name: req.user.name,
  });
});

module.exports = router;
