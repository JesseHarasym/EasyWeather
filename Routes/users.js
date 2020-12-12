const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const keys = require("../Config/keys");
const validateRegisterInput = require("../Validation/register");
const validateLoginInput = require("../Validation/login");
const validateSettingsInput = require("../Validation/settings");
const User = require("../Models/user");

//post route for user registration
router.post("/register", (req, res) => {
  //return error if the input data does not meet validation criteria
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  //look if a user already has the input email, if so throw an error
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      //if no errors create new user object
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        city: req.body.city,
        temperature: req.body.temperature,
      });
      //use bcrypt to hash the input password with 10 salt for faster loading (less secure)
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          //after hash, save the new user to our database
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

//post route for login
router.post("/login", (req, res) => {
  //return error if the input data does not meet validation criteria
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  //take email and password from request body
  const email = req.body.email;
  const password = req.body.password;
  //search document for a user that had the input email
  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email was not found" });
    }
    //use bcrypt.compare to compare the input passwords to the hashed ones in our mongo database
    bcrypt.compare(password, user.password).then((isMatch) => {
      //if it matches create payload object with user info
      if (isMatch) {
        const payload = {
          id: user.id,
          name: user.name,
          email: user.email,
          city: user.city,
          temperature: user.temperature,
        };
        //add payload with our passport key in keys.js and our expiration time to create our jwt token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 15778463,
          },
          (err, token) => {
            //send token to frontend and let it know the login was successful
            res.json({
              success: true,
              token: "Bearer " + token,
            });
          }
        );
      } else {
        //return error if the password entered by the user did not match the database password
        return res
          .status(400)
          .json({ passwordincorrect: "Password is incorrect" });
      }
    });
  });
});

//put route for edituser
router.put("/edituser", (req, res) => {
  //return error if the input data does not meet validation criteria
  const { errors, isValid } = validateSettingsInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  //create variable for data from request body, and for user_id to check for match to update
  var user = {
    $set: {
      name: req.body.name,
      city: req.body.city,
      temperature: req.body.temperature,
    },
  };
  //check if database had a user_id that matches the user_id passed in the request
  User.updateOne({ _id: req.body.id }, user, function (err) {
    if (err) {
      //if user_id does not match any users in database, throw error accordingly
      return res
        .status(400)
        .json({ userNotFound: "Could not update this user" });
    } else {
      //send user data to frontend
      res.json({
        user: req.body,
      });
    }
  });
});

//post route for deleteUser
router.post("/deleteuser", (req, res) => {
  User.deleteOne({ _id: req.body.id }, function (err, obj) {
    if (err) {
      //if user_id does not match any users in database, throw error accordingly
      return res
        .status(400)
        .json({ userNotDeleted: "This user could not be deleted" });
    } else {
      //let frontend know it was deleted succesfuly
      res.json({
        deleted: true,
      });
    }
  });
});

module.exports = router;
