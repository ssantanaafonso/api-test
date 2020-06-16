//INITIALIZATION
var express = require("express"),
    app = express(),
    bodyParser  = require("body-parser"),
    methodOverride = require("method-override");
    mongoose = require('mongoose');
    require('./models/customers')

    CustomerCtrl = require('./controllers/customers')

//MIDLEWARE
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(methodOverride());

//ROUTES
var router = express.Router();

router.route('/customers')
  .get(CustomerCtrl.findAllCustomers)
  .post(CustomerCtrl.addCustomer);

router.route('/customers/:id')
  .get(CustomerCtrl.findCustomerById)
  .put(CustomerCtrl.updateCustomer)
  .delete(CustomerCtrl.deleteCustomer);

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
