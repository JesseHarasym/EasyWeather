const Validator = require("validator");
const isEmpty = require("is-empty");
// const fetch = require("node-fetch");

module.exports = function validateRegisterInput(data) {
  let errors = {};
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";
  data.city = !isEmpty(data.city) ? data.city : "";

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password field is required";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }

  if (Validator.isEmpty(data.city)) {
    errors.city = "Preferred City field is required";
  }

  // if (CallBack(data.city) === false) {
  //   errors.city = "Valid City field is required";
  // }

  if (Validator.isEmpty(data.temperature)) {
    errors.temperature = "Preferred temperature field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

// const ValidateCity = async (city) => {
//   let validCity = false;
//   const API = "64ac0950f15df1a9f2d16c0d110a9a3c";
//   const weatherURL = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API}`;
//   await fetch(weatherURL)
//     .then((res) => res.json())
//     .then((data) => {
//       try {
//         data.list.filter((reading) => reading.dt_txt.includes("21:00:00"));
//         validCity = true;
//       } catch {
//         validCity = false;
//       }
//     });
//   return validCity;
// };

// const CallBack = async (city) => {
//   let valid = await ValidateCity(city);
//   console.log(valid);
//   return valid;
// };
