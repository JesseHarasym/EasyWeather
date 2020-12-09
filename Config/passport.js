const JwtStrategy = require("passport-jwt").Strategy;
const mongoose = require("mongoose");
const ExtractJwt = require("passport-jwt").ExtractJwt;
const keys = require("./keys");
const User = mongoose.model("users");
const ops = {};

//add passport key and headers token to our ops object
ops.secretOrKey = keys.secretOrKey;
ops.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

module.exports = (passport) => {
  passport.use(
    //create new jwt strategy with our ops object
    new JwtStrategy(ops, (jwt_payload, done) => {
      //find user by our jwt's payload data, by matching payload id to our database documents id
      User.findById(jwt_payload.id)
        .then((user) => {
          if (user) {
            //return user if you can find a user in the document that matches the user payload
            return done(null, user);
          }
          //otherwise return false indicating no user found
          return done(null, false);
        })
        .catch((err) => console.log(err));
    })
  );
};
