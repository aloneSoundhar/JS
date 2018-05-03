// Imported Express
const express = require('express');
// Importing Passport
const passport = require('passport');
// Google Authentuication
const GoogleStrategy = require('passport-google-oauth20').Strategy;
// Keys for GoogleStrategy
const Keys = require('./config/keys');

// Inititalised Express in app
const app = express();

passport.use(
  new GoogleStrategy({
  clientID: Keys.googleClientID,
  clientSecret: Keys.googleClientSecret,
  callbackURL: '/auth/google/callback'
  }, accessToken => {
    console.log(accessToken);
  })
);

// Set a static port for listening requests
app.listen(5000);