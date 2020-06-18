var mongoose = require('mongoose');
var User = mongoose.model('User');

//GET - Return all users in the DB
exports.findAllUsers = function(req, res) {
    User.find(function(err, users) {
    if(err) res.send(500, err.message);
    console.log('GET /users')
        res.status(200).jsonp(users);
    });
};
//GET - Return a certain user in the DB by Id
exports.findUserById = function(req, res) {
    User.findUserById(req.params.id, function(err, user) {
    if(err) return res.send(500, err.message);
    console.log('GET /user/' + req.params.id);
        res.status(200).jsonp(user);
    });
};

//POST - Insert a new user in the DB
exports.addUser = async function(req, res) {
    //const emailExists = User.findOne({email: email});
    console.log('POST');
    console.log(req.body);
    if(false){
        return res.status(500).send('Email already exists');
    }else{
        var user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role
        });
        user.password = await user.encryptPassword(req.body.password);
        user.save(function(err, user) {
            if(err) return res.status(500).send( err.message);
        res.status(200).jsonp(user);
        });
    }  
};

//PUT - Update a register already exists
exports.updateUser = function(req, res) {
    User.findUserById(req.params.id, function(err, user) {
        user.name = req.body.name,
        user.email = req.body.email,
        user.password = req.body.password,
        user.role = req.body.role
        user.save(function(err) {
            if(err) return res.status(500).send(err.message);
        res.status(200).jsonp(user);
        });
    });
};

//DELETE - Delete a User with specified ID
exports.deleteUser = function(req, res) {
    User.findById(req.params.id, function(err, user) {
        user.remove(function(err) {
            if(err) return res.status(500).send(err.message);
      res.status(200).send();
        })
    });
};