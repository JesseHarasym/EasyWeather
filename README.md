# EasyWeather

# A web application that allows you to check the weather to a given destination!

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Installing

What you will need to run this application

```
git clone https://github.com/JesseHarasym/EasyWeather.git
```

#### Install Server Dependencies

First ensure you are in the right directory, you should be under EasyWeather. If not first type:

``
cd EasyWeather
``

And then install the dependencies under this folder, like follows:

``
npm install bcrypt body-parser concurrently express is-empty jsonwebtoken jwt-decode mongoose passport passport-jwt validator
``

#### Install Client Dependencies

First ensure you are in the right directory, you should be under client. If not then:

``
cd client
``

And then install the dependencies under this folder:

``
npm install axios bootstrap jwt-decode moment react react-dom react-redux react-router-dom redux redux-thunk
``

#### Install Developer Dependencies

Change back into the EasyWeather folder:

``
cd ..
``

And then install the developer dependencies:

``
npm install -D nodemon
``

<!-- 
#### Add MongoDB Key and Passport Key

The key to connect to the mongoDB database can be added under Config as keys.js (ex. Config/keys.js), added like so:

```
module.exports = {
  mongoURI: "mongodb+srv://<user>:<password>@<dbname>.hhuag.mongodb.net",
  secretOrKey: "secret",
};
```

That will add the needed secret key for our passport.js file aswell. You can create your database to gain your mongoURI at: https://www.mongodb.com/try if you don't already have one available.


#### Add OpenWeatherApp API Key

The key to connect to the OpenWeatherMap API can be added by opening the client folder, followed by src, then create the API_Keys.js under the API folder (ex: client/src/API/API_Keys.js) added like so:

```
const API = "########################";

export default API;
```

This will be all you need to get the API up and running. You can sign up for this API key from the OpenWeatherMap by signing up at: https://openweathermap.org/api

You can chose the 5 day forecast option and sign up for the free option, one you recieve the key and add it as stated, you can get the application up and running. -->

### Running

After installing all dependencies you can run the web app by typing:

``
npm run dev
``

This will run the server and client concurrently so that you can easily test it.

## Built With

- React.js
- Node.js
- MongoDB

Various NPM packages used can be seen in the npm install.
