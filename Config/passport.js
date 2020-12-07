const JwtStrategy = require("passport-jwt").Strategy;
const mongoose = require("mongoose");
const ExtractJwt = require("passport-jwt").ExtractJwt;
const keys = require("./mongoKey");
const User = mongoose.model("users");
const opts = {};

opts.secretOrKey = keys.secretOrKey;
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then((user) => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch((err) => console.log(err));
    })
  );
};
