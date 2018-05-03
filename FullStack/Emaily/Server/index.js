// Imported Express
const express = require('express');
// Importing Passport
const passport = require('passport');
// Google Authentuication
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// Inititalised Express in app
const app = express();

// Hadled Root Route with get http Verb
app.get("/", (req, res) => {
  res.send({ hi: "There" });
});

//   clientID: '985355583629-1rdpnv4cvnp6lbb4s7q3c7j25ur5e1r4.apps.googleusercontent.com',
//   clientSecret: '9ZCmtmwGSDiNeN00PTe2kBWl' 

passport.use(new GoogleStrategy({

}, ))

// Set a static port for listening requests
app.listen(5000);