module.exports = {
  ensureAuthicated: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash("error_msg", "Please log in view this resource");
    res.redirect("/users/login");
  },
};
