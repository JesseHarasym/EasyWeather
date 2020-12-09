const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateSettingsInput(data) {
  let errors = {}; //to hold errors
  //to make empty input an empty string, so we're able to validate it
  data.name = !isEmpty(data.name) ? data.name : "";
  data.city = !isEmpty(data.city) ? data.city : "";
  data.temperature = !isEmpty(data.temperature) ? data.temperature : "";

  //ensure name is not empty when editing user
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  //ensure city is not empty when editing user (would like to add validateCity method when
  //i get it working on registration side)
  if (Validator.isEmpty(data.city)) {
    errors.city = "Preferred City field is required";
  }

  //ensure temperature field is chosen
  if (Validator.isEmpty(data.temperature)) {
    errors.temperature = "Preferred temperature field is required";
  }

  //return if its valid and the errors to be used for frontend
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
