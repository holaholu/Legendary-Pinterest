// Get dependencies
var express = require('express');
var path    = require("path");
//var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();

//connect to database
var mongoose = require("mongoose");

var url = process.env.MEMURL ;
 mongoose.connect(url).then(() =>  console.log('connected to database '))
  .catch((err) => console.error(err));;

  //Import Model
var Pinuser  = require("./models/pinuser");
var Image  = require("./models/image");

  //=================================
var passport                    = require("passport"),
    LocalStrategy               = require("passport-local").Strategy,
    TwitterStrategy             = require('passport-twitter').Strategy;


  
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

//Local Auth
passport.use(new LocalStrategy(Pinuser.authenticate()));
// passport.serializeUser(Pinuser.serializeUser());
// passport.deserializeUser(Pinuser.deserializeUser());
//==========

//Twitter Auth
passport.use(new TwitterStrategy ({
    consumerKey: process.env.CONSUMER_KEY,
    consumerSecret: process.env.CONSUMER_SECRET,
    callbackURL: '/login/twitter/return'
  },
  function(token, tokenSecret, profile, cb) {
      return cb(null, profile);
  }));
  
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

//==================
//Authentication

app.get('/twittersignin', passport.authenticate('twitter'));

app.get('/login/twitter/return',
  passport.authenticate('twitter', { failureRedirect: '/login' }),
  function(req, res) {
    
   Pinuser.find({username:req.user.username},function (err,founduser){ //logic below adds to database if user does not already exist in database
        if (err){
          console.log(err)
        }else {
           if(founduser.length<1){
              Pinuser.register(new Pinuser({username:req.user.username}),function(err,user){
      if (err){
           res.send(err.message);
         
      }else {
       
         res.redirect("/pinboard");
      
  } } );
           }else {
             res.redirect("/pinboard");
           }

        }

   })
      
    

  
  } );








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

  if (req.user._id==undefined) {
           
 Pinuser.remove({username:req.user.username},function(err){
   if(err){
     console.log(err.message);
   }

})

  } else {
       
Pinuser.findByIdAndRemove(req.user._id,function(err){
   if(err){
     console.log(err.message);
   }else {
     
   }

})
}
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



app.post("/addimage",function(req,res){
       // save/register user details and authenticate for instant login
  Image.create(new Image({username:req.user.username,url:req.body.url,title:req.body.title}),function(err,img){
      if (err){
           res.send(err.message);
         
      }else {
      
             
    
      }
  });
 res.redirect("/getimage")
})

app.get("/getimage",function(req,res){
       // save/register user details and authenticate for instant login
  Image.find({username:req.user.username},function(err,img){
      if (err){
           res.send(err.message);
         
      }else {
         img.sort(function(a,b){
          return new Date(b.date) - new Date(a.date);
          }); 
      
            res.send(img);
           
    
      }
  });
 
})

app.get("/getrecent",function(req,res){
       // save/register user details and authenticate for instant login
  Image.find({},function(err,img){
      if (err){
           res.send(err.message);
         
      }else {
      
         
         
       //date sort code
       img.sort(function(a,b){
          return new Date(b.date) - new Date(a.date);
          });      
         
          res.send(img);
         
    
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