const express = require("express");
const exphbs = require("express-handlebars");
const passport = require("passport");
const dotenv = require("dotenv");
const morgan = require("morgan");
const routes = require("./routes/index");
const authRoute = require("./routes/auth");

const hbs = require("hbs");
const path = require("path");
const session = require("express-session");

const connectDb = require("./config/db");

dotenv.config({ path: "./config/config.env" });

require("./config/passport")(passport);

passport;
//conect db
connectDb();

const app = express();

////////////////////Middleware declaration//////////////////////////////////
app.use(morgan("dev"));

//////////////////////Handlebars////////////////////////////////////////
app.engine(
  "hbs",
  exphbs({
    defaultLayout: "main",
    extname: ".hbs",
  })
);

app.set("view engine", "hbs");
///////////////////////////////////////////////////////////////////
////////////////Passport middleware///////////////////////////////
app.use(
  session({
    secret: "keyboard cat",
    saveUninitialized: true,
    cookie: { secure: true },
  })
);

app.use(passport.initialize());
app.use(passport.session());
//Routes
app.use("/", routes);
app.use("/auth", authRoute);

//Serves static files (we need it to import a css file)
app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
