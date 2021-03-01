const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const users = require("./Routes/users");
const app = express();
const port = process.env.PORT || 80;

//setup midleware for body parsing
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

//configure database with our mongoURI key
const db = require("./Config/keys").mongoURI;

//conect to our mongo database
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err));

//setup passport for user authentication
app.use(passport.initialize());
require("./Config/passport")(passport);

//use user routes for registration, login and editing user
app.use("/users", users);

//connect to given port
app.listen(port, () => console.log(`Server running on port ${port}`));
