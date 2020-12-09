const Validator = require("validator");
const isEmpty = require("is-empty");
// const fetch = require("node-fetch");

module.exports = function validateRegisterInput(data) {
  let errors = {}; //to hold errors
  //to make empty input an empty string, so we're able to validate it
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";
  data.city = !isEmpty(data.city) ? data.city : "";

  //ensure name input is not empty
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  //ensure email input not empty, and is a valid email address
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  //passport validation from user, ensure not empty
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password field is required";
  }

  //ensure passport is a minimum of 6 characters
  if (!Validator.isLength(data.password, { min: 6, max: 25 })) {
    errors.password = "Password must be at least 6 characters";
  }
  //ensure both password inputs match
  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }

  //ensure city field is entered
  if (Validator.isEmpty(data.city)) {
    errors.city = "Preferred City field is required";
  }

  //ensure the city is a valid city fetchable by the API
  // if (CallBack(data.city) === false) {
  //   errors.city = "Valid City field is required";
  // }

  //ensure a temperature preference is chosen
  if (Validator.isEmpty(data.temperature)) {
    errors.temperature = "Preferred temperature field is required";
  }

  //return if its valid and the errors to be used for frontend
  return {
    errors,
    isValid: isEmpty(errors),
  };
};

//this is commented out, because im having issues getting the async function to return
//the validation to the form in time, which causes unwanted side effects (only validates on 2nd click)
//will revisit at a later date to try to fix
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
