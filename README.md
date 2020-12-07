# EasyWeather

# A web application that allows you to check the weather to a given destination!

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Installing

What you will need to run this application

```
git clone https://github.com/JesseHarasym/EasyWeather.git
```

#### Install Dependencies

``
npm install axios boostrap bcryptjs body-parser classnames concurrently express is-empty jwt-decode jsonwebtoken moment mongoose passport passport-jwt react-redux react-router-dom redux redux-thunk validator
``

#### Install Developer Dependencies

``
npm install -D nodemon
``

#### Add MongoDB Key

The key to connect to the mongoDB database can be added under Config as mongoKey.js (ex. Config/mongoKey.js), added like so:

``
module.exports = {
  mongoURI: "mongodb+srv://<user>:<password>@<dbname>.hhuag.mongodb.net",
  secretOrKey: "secret",
};
``

That will add the needed secret key for our passport.js file aswell. You can create your database to gain your mongoURI at: https://www.mongodb.com/try if you don't already have one available.


#### Add OpenWeatherApp API Key

The key to connect to the OpenWeatherMap API can be added by opening the client folder, followed by src, then create the API_Keys.js under the API folder (ex: client/src/API/API_Keys.js) added like so:

``
const API = "#######################";

export default API;
``

This will be all you need to get the API up and running. You can sign up for this API key from the OpenWeatherMap by signing up at: https://openweathermap.org/api

You can chose the 5 day forecast option and sign up for the free option, one you recieve the key and add it as stated, you can get the application up and running.

### Running

After installing all dependencies and adding your keys, you can run the web app by typing:

```
npm run dev
```

This will run the server and client concurrently so that you can easily test it.

## Built With

-React.js
-Node.js
-MongoDB

Various NPM packages used can be seen in the npm install.
