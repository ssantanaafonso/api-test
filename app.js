//INITIALIZATION
var express = require("express"),
    app = express(),
    bodyParser  = require("body-parser"),
    methodOverride = require("method-override");
    mongoose = require('mongoose');
    require('./models/customers');
    require('./models/users');
    CustomerCtrl = require('./controllers/customers');
    UserCtrl = require('./controllers/users');
    passport = require('passport');
    require('./config/passport');

//MIDLEWARE
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(passport.initialize());
//ROUTES
var router = express.Router();

  //customers

  router.route('/customers')
    .get(passport.authenticate('basic', { session: false }), CustomerCtrl.findAllCustomers)
    .post(CustomerCtrl.addCustomer);

  router.route('/customers/:id')
    .get(CustomerCtrl.findCustomerById)
    .put(CustomerCtrl.updateCustomer)
    .delete(CustomerCtrl.deleteCustomer);

  //users
  router.route('/users')
    .get(passport.authenticate('basic', { session: false }), UserCtrl.findAllUsers)
    .post(UserCtrl.addUser);



app.use(router);

//mongoose
/* mongoose.connect('mongodb://127.0.0.1:27017/users')
var db = mongoose.connection
db.on('error', function(err){
  console.log('connection error', err)
})

db.once('open', function(){
  console.log('Connection to DB successful')
}) */

mongoose.connect('mongodb://localhost/customers', function(err, res) {
  if(err) {
    console.log('ERROR: connecting to Database. ' + err);
  }
  app.listen(3000, function() {
    console.log("Node server running on http://localhost:3000");
  });
});
