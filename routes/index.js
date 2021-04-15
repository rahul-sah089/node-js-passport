const express = require("express");
const router = express.Router();

//@Desc login/landing page
//@route GET /
router.get("/", (req, res) => {
  res.render("login", { layout: "login" });
});

router.get("/dashboard", (req, res) => {
  res.render("dashboard");
});

//@Desc Dashboard
//@route GET /dashboard
router.get("/dashboard", (req, res) => {
  res.render("dashboard");
});

router.get("/something", (req, res) => {
  res.send("Something");
});

module.exports = router;
