//INITIALIZATION
var express = require("express"),
    app = express(),
    bodyParser  = require("body-parser"),
    methodOverride = require("method-override");
    mongoose = require('mongoose');

//MIDLEWARE
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(methodOverride());

//ROUTES
var router = express.Router();
router.get('/', function(req, res) {
   res.send("Hello World!");
});
app.use(router);

//SERVER LISTENNING
app.listen(3000, function() {
  console.log("Node server running on http://localhost:3000");
});