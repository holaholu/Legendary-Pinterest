var mongoose        = require("mongoose");

//ADDED FOR AUTHENTICATION
var passportLocalMongoose   = require ("passport-local-mongoose");

var ImageSchema = new mongoose.Schema({
     username: String, 
     url: String,
     title:String,
     date: { type: Date, default: Date.now }
  
   
  });
  
 
  
  
 module.exports  = mongoose.model('Image',ImageSchema );