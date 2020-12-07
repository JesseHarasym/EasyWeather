const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const users = require("./Routes/users");
const app = express();
const port = 5000;

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(bodyParser.json());

const db = require("./Config/mongoKey").mongoURI;

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err));

app.use(passport.initialize());
require("./Config/passport")(passport);

app.use("/users", users);
app.listen(port, () => console.log(`Server running on port ${port}`));
