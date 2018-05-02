const express = require("express");

// Initialisig Express server
const app = express();

// Handling Root Route get Request
app.get("/", (req, res) => {
  res.send({hi: "There"});
});

const PORT = process.env.PORT || 5000;


// Listens to the specific Port
app.listen(PORT);


