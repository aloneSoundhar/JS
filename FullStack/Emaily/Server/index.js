// Imported Express
const express = require("express");

// Inititalised Express in app
const app = express();

// Hadled Root Route with get http Verb
app.get("/", (req, res) => {
  res.send({ hi: "There" });
});

// Set a static port for listening requests
app.listen(5000);