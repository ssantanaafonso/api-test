

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
    multer = require('multer');
    

    storage = multer.diskStorage({
      destination: function(req, file, cb) {
        cb(null, './uploads/');
      },
      filename: function(req, file, cb){
        var extension = file.mimetype.split('/')
        cb(null, Date.now()+'.'+extension[1]);
      }
    });

    fileFilter = (req, file, cb) => {
      if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true);
      }else{
        req.fileValidationError = 'Wrong mimetype, only jpeg or png files accepted';
        cb(null, false, new Error('Wrong mimetype, only jpeg or png files accepted'));
      }
    }

    upload = multer({storage: storage, 
      limits: {
        fileSize: 1024*1024*10
      },
      fileFilter: fileFilter
    });

//MIDLEWARE
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(passport.initialize());
  app.use('/uploads', express.static('uploads'));
//ROUTES
var router = express.Router();

  //customers

  router.route('/customers')
    .get(passport.authenticate('basic', { session: false }), CustomerCtrl.findAllCustomers)
    .post(passport.authenticate('basic', { session: false }), CustomerCtrl.addCustomer);

  router.route('/customers/:id')
    .get(passport.authenticate('basic', { session: false }), CustomerCtrl.findCustomerById)
    .put(passport.authenticate('basic', { session: false }), CustomerCtrl.updateCustomer)
    .delete(passport.authenticate('basic', { session: false }), CustomerCtrl.deleteCustomer);

  router.route('/customers/:id/profilePic')
    .put(passport.authenticate('basic', { session: false }), upload.single('customerImage'), CustomerCtrl.updateCustomerImage);

  //users
  router.route('/users')
    .get(passport.authenticate('basic', { session: false }), UserCtrl.findAllUsers)
    .post(passport.authenticate('basic', { session: false }), UserCtrl.addUser);
  router.route('/users/:id')
    .get(passport.authenticate('basic', { session: false }), UserCtrl.findUserById)
    .put(passport.authenticate('basic', { session: false }), UserCtrl.updateUser)
    .delete(passport.authenticate('basic', { session: false }), UserCtrl.deleteUser);
  
app.use(router);

mongoose.connect('mongodb://localhost/customers', function(err, res) {
  if(err) {
    console.log('ERROR: connecting to Database. ' + err);
  }
  app.listen(3000, function() {
    console.log("Node server running on http://localhost:3000");
  });
});
