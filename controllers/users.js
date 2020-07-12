var mongoose = require('mongoose');
var User = mongoose.model('User');

//GET - Return all users in the DB
exports.findAllUsers = async function(req, res) {
    if(req.user.role != "admin") return res.send(401, "Not enough permissions to manage users");
    await User.find(function(err, users) {
    if(err) res.send(500, err.message);
    console.log('GET /users')
        res.status(200).jsonp(users);
    });
};
//GET - Return a certain user in the DB by Id
exports.findUserById = async function(req, res) {
    if(req.user.role != "admin") return res.send(401, "Not enough permissions to manage users");
    await User.findById(req.params.id, function(err, user) {
    if(err) return res.status(404).send("User not found");
    console.log('GET /user/' + req.params.id);
        res.status(200).jsonp(user);
    });
};

//POST - Insert a new user in the DB
exports.addUser = async function(req, res) {
    if(req.user.role !== "admin") return res.send(401, "Not enough permissions to manage users");
    const emailExists = await User.findOne({email: req.body.email}, function(err,obj) {
        if(obj !== null){
            console.log(obj.email);
        }
    });

    console.log('POST');
    console.log(req.body);
    if(emailExists !== null){
        return res.status(400).send('Email already exists');
    }else{
        var user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role
        });
        user.password = await user.encryptPassword(req.body.password);
        await user.save(function(err, user) {
            if(err) return res.status(500).send( err.message);
        res.status(200).jsonp(user);
        });
    }  
};

//PUT - Update a register already exists
exports.updateUser = async function(req, res) {
    if(req.user.role != "admin") return res.send(401, "Not enough permissions to manage users");
    if(req.body.role !== "admin" && req.body.role !== "user") return res.send(400, "Only 'admin' or 'user' values are allowed for field 'role'")
    await User.findById(req.params.id, async function(err, user) {
        if(err) return res.status(404).send("User not found");

        if(user.role === 'admin'){
            //If only exists one admin user at db it wont be role updated
            const onlyAdmin = await User.find({role: "admin"}, function(err,obj) { 
                if(err) return res.status(500).send("Server error");
            })
            if(onlyAdmin.length === 1 && user.role !== req.body.role){
                console.log(onlyAdmin.length);
                return res.status(400).send('The last admin user can not change its role');
            }
        }

        user.name = req.body.name,
        user.email = req.body.email,
        user.password = req.body.password,
        user.role = req.body.role
        user.password = await user.encryptPassword(req.body.password);
        await user.save(function(err) {
            if(err) return res.status(500).send(err.message);
        res.status(200).jsonp(user);
        });
    });
};

//DELETE - Delete a User with specified ID
exports.deleteUser = async function(req, res) {
    if(req.user.role != "admin") return res.send(401, "Not enough permissions to manage users");
    console.log(`DELETE USER ${req.params.id}`);

    await User.findById(req.params.id, async function(err, user) {
        if(err) return res.status(404).send("User not found");
        const onlyAdmin = await User.find({role: "admin"}, function(err,obj) { 
            if(err) return res.status(500).send("Server error");
        })
        //If only exists one admin user at db it wont be removed
        if(user.role === 'admin'){ 
            if(onlyAdmin.length === 1){
                console.log(onlyAdmin.length);
                return res.status(400).send('The only admin user can not be deleted');
            }else{
                await user.remove(function(err) {
                    if(err) return res.status(500).send(err.message);
                    return res.status(200).send("User "+user.name+ " removed");
                })
            }
        }
        else{
            await user.remove(function(err) {
                if(err) return res.status(500).send(err.message);
            res.status(200).send("User "+user.name+ " removed");
            })
        }
    });
};