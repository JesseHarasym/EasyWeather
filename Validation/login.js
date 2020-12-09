const Validator = require("validator");
const isEmpty = require("is-empty");

//this is our login validation for our login components
module.exports = function validateLoginInput(data) {
  let errors = {}; //to hold errors
  //to make empty input an empty string, so we're able to validate it
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  //validate our email
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  //ensure password input is not empty
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  //return if its valid and the errors to be used for frontend
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
