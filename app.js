const express = require("express");
const expresslayout = require("express-ejs-layouts");
const connectDb = require("./config/db");
const app = express();
const path = require("path");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");

//Passport Config
require('./config/passport')(passport);

require("dotenv").config();
connectDb();
////////////Body Parser Middleware//////////////////////
app.use(express.urlencoded({ extended: false }));
///////////////////////////////////////////////////////////////
//Static Webpage view
app.use(express.static(path.join(__dirname, "public")));
/////////////////////Express Session////////////////////////////
//Maintain the user session across user request
app.use(
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true
  })
);
/////////////////////////Passport Middleware////////////////////////////
app.use(passport.initialize());
app.use(passport.session());
///////////////////////////////////////////////////////////////////////
//Connect flash
app.use(flash());

//Global vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});
//////////////////View EJS MiddleWare///////////////////////////
app.use(expresslayout);
app.set("view engine", "ejs");
////////////////////Passport Middleware/////////////////////////

//////////////////Add the middleware///////////////////////////
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));

const PORT = process.env.PORT || 5000;
const mongooseport = process.env.MONGO_URI;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
  console.log(`Mongoose URI ${mongooseport}`);
});
