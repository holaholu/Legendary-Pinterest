var mongoose        = require("mongoose");

//ADDED FOR AUTHENTICATION
var passportLocalMongoose   = require ("passport-local-mongoose");

var PinuserSchema = new mongoose.Schema({
     username: String, 
     email: String,
     password:String,
  
   
  });
  
  //ADDED TO INCLUDE ALL AUTHENTICATION METHOD INTO SCHEMA
 PinuserSchema.plugin(passportLocalMongoose );
  
  
 module.exports  = mongoose.model('Pinuser',PinuserSchema );