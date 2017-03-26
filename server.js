// Get dependencies
var express = require('express');
var path    = require("path");
//var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();

//connect to database
var mongoose = require("mongoose");

var url = process.env.MEMURL ;
 mongoose.connect(url).then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));;

  //Import Model
var Pinuser  = require("./models/pinuser");

  //=================================
var passport                    = require("passport"),
    LocalStrategy               = require("passport-local").Strategy;
   


  
 // Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//View Engine
app.set("view engine","ejs");
//public files
app.use (express.static("public"));
// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));


//Import Model


//Authenticate Section

  app.use(require("express-session")({
    secret: "Rusty the world",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(Pinuser.authenticate()));
passport.serializeUser(Pinuser.serializeUser());
passport.deserializeUser(Pinuser.deserializeUser());
//Authentication


app.post("/signup",function(req,res){
       // save/register user details and authenticate for instant login
  Pinuser.register(new Pinuser({username:req.body.username,email:req.body.email}),req.body.password,function(err,user){
      if (err){
           res.send(err.message);
         
      }else {
        passport.authenticate("local")(req,res,function(){
              res.send(req.user.username);
              // console.log(req.user)
       });
      }
  });
 
})



 app.post("/login",passport.authenticate("local",{}),function(req,res){
     //console.log(req.user)
      
        if (req.user==undefined){
          res.send("")
        } else {
              res.send(req.user.username);
              
        }
      
      });

app.get('/logout',(req,res)=>{
   req.logout();
 res.redirect("/");
  
});


app.get('/getuser',(req,res)=>{
  if (req.user== undefined){
    res.send("");
    
 }else {
res.send(req.user.username);

  }
  
});

app.post("/settings",function(req,res){
  var store=req.user
       
Pinuser.findByIdAndRemove(req.user._id,function(err){
   if(err){
     console.log(err.message);
   }else {
     
   }

})

  Pinuser.register(new Pinuser({username:store.username,email:store.password}),req.body.password,function(err,user){
      if (err){
           res.send(err.message);
         
      }else {
        passport.authenticate("local")(req,res,function(){
              res.send(req.user.username);
              
       });
      }
  });
 
})


// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html')); //path installation required

});






/**
 * Get port from environment and store in Express.
 */
var port = process.env.PORT || '3000';



app.listen(port,function(){
  console.log("Server has started")
})