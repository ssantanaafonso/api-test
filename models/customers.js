//Initialize mongoose
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

//Declaring Schema Object
var customerSchema = new Schema({
  name:    { type: String, required: true },
  surname:     { type: String, required: true },
  photo:   { type: String },
  createdBy:  { type: String },
  modifiedBy:    { type: String },
  lastModified:  { type: Date, default: Date.now }
});

module.exports = mongoose.model('Customer', customerSchema);