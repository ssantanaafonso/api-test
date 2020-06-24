//Initialize mongoose and customer model
var mongoose = require('mongoose');
var Customer  = mongoose.model('Customer');

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
    if(err) return res.send(500, err.message);
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
        photo:   req.body.photo,
        createdBy:  req.body.createdBy,
        modifiedBy:    req.body.modifiedBy,
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
        customer.name = req.body.name,
        customer.surname = req.body.surname,
        customer.photo = req.body.photo,
        customer.createdBy = req.body.createdBy,
        customer.modifiedBy = req.body.modifiedBy,
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
        customer.remove(function(err) {
            if(err) return res.status(500).send(err.message);
      res.status(200).send();
        })
    });
};