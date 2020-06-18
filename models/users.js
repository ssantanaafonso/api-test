const mongoose = require('mongoose');
const {Schema} = mongoose;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    role: {type: String, required: true}
});

//Encrypt user password
UserSchema.methods.encryptPassword = async (password) => {
    const salt =  await bcrypt.genSalt(10);
    const hash =  bcrypt.hash(password, salt);
    return hash;
};

//Used for login the user (password compairing)
UserSchema.methods.comparePassword = function (password) {
    return  bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);