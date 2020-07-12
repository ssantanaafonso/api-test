//Initialize mongoose and customer model
var mongoose = require('mongoose');
var Customer  = mongoose.model('Customer');
var fs = require('fs');

//GET - Return all customers in the DB
exports.findAllCustomers = function(req, res) {
    Customer.find(function(err, customers) {
    if(err) res.send(500, err.message);
    console.log('GET /customers')
        res.status(200).jsonp(customers);
    });
};
//GET - Return a certain customers in the DB by Id
exports.findCustomerById = function(req, res) {
    Customer.findById(req.params.id, function(err, customer) {
    if(err) return res.send(404, "User does not exist");
    console.log('GET /customer/' + req.params.id);
        res.status(200).jsonp(customer);
    });
};

//POST - Insert a new customer in the DB
exports.addCustomer = function(req, res) {
    console.log('POST');
    console.log(req.body);
    var customer = new Customer({
        name:    req.body.name,
        surname:     req.body.surname,
        photo: 'none',
        createdBy:  req.user.name,
        modifiedBy:    req.user.name,
        lastModified:  req.body.lastModified
    });
    customer.save(function(err, customer) {
        if(err) return res.status(500).send( err.message);
    res.status(200).jsonp(customer);
    });
};

//PUT - Update a register already exists
exports.updateCustomer = function(req, res) {
    Customer.findById(req.params.id, function(err, customer) {
        if(err) return res.status(404).send("User not found");
        customer.name = req.body.name,
        customer.surname = req.body.surname,
        customer.createdBy = customer.createdBy,
        customer.modifiedBy = req.user.name,
        customer.lastModified = req.body.lastModified
        customer.save(function(err) {
            if(err) return res.status(500).send(err.message);
      res.status(200).jsonp(customer);
        });
    });
};

//PUT - Updates a customer profile picture

exports.updateCustomerImage = function(req, res) {
    if (req.fileValidationError) return res.status(422).send(req.fileValidationError);
    if (typeof req.file === 'undefined') {
        return res.status(422).send("An image should be attached");
    }
    Customer.findById(req.params.id, function(err, customer) {
        if(err) return res.status(404).send("User not found");
        if(customer.photo != 'none'){
            fs.unlink(customer.photo, (err) =>{
                if(err){
                    console.error(err)
                    return
                }
            });
        }
        customer.photo = req.file.path.replace("\\", "/"),
        customer.modifiedBy = req.user.name,
        customer.lastModified = req.body.lastModified
        customer.save(function(err) {
            if(err) return res.status(500).send(err.message);
            res.status(200).jsonp(customer);
        });
    });
};

//DELETE - Delete a Customer with specified ID
exports.deleteCustomer = function(req, res) {
    Customer.findById(req.params.id, function(err, customer) {
        if(err) return res.status(404).send("Customer not found");
        customer.remove(function(err) {
            if(err) return res.status(500).send(err.message);
            res.status(200).send("Customer "+customer.name+ " removed");
        })
    });
};