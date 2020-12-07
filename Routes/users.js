const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../Config/mongoKey");
const validateRegisterInput = require("../Validation/register");
const validateLoginInput = require("../Validation/login");
const User = require("../Models/user");

router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        city: req.body.city,
        temperature: req.body.temperature,
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email was not found" });
    }
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        const payload = {
          id: user.id,
          name: user.name,
          email: user.email,
          city: user.city,
          temperature: user.temperature,
        };
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 15778463,
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password is incorrect" });
      }
    });
  });
});

router.post("/edituser", (req, res) => {
  console.log(req.body);
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ _id: req.body.id }).then((user) => {
    if (user) {
      const editUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        city: req.body.city,
        temperature: req.body.temperature,
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(editUser.password, salt, (err, hash) => {
          if (err) throw err;
          editUser.password = hash;
          editUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    }
  });

  // User.findOne({ email: req.body.email }).then((user) => {
  //   if (user) {
  //     return res.status(400).json({ email: "Email already exists" });
  //   } else {
  //     const editUser = new User({
  //       name: req.body.name,
  //       email: req.body.email,
  //       password: req.body.password,
  //       city: req.body.city,
  //       temperature: req.body.temperature,
  //     });
  //     bcrypt.genSalt(10, (err, salt) => {
  //       bcrypt.hash(editUser.password, salt, (err, hash) => {
  //         if (err) throw err;
  //         editUser.password = hash;
  //         editUser
  //           .save()
  //           .then((user) => res.json(user))
  //           .catch((err) => console.log(err));
  //       });
  //     });
  //   }
  // });
});

module.exports = router;
