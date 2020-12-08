const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateSettingsInput(data) {
  let errors = {};
  data.name = !isEmpty(data.name) ? data.name : "";
  data.city = !isEmpty(data.city) ? data.city : "";
  data.temperature = !isEmpty(data.temperature) ? data.temperature : "";

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  if (Validator.isEmpty(data.city)) {
    errors.city = "Preferred City field is required";
  }

  if (Validator.isEmpty(data.temperature)) {
    errors.temperature = "Preferred temperature field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
