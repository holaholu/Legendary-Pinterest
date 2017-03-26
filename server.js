// Get dependencies
var express = require('express');
var path    = require("path");
//var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();

//connect to database
// var mongoose = require("mongoose");

// var url = process.env.MEMURL ;
//  mongoose.connect(url).then(() =>  console.log('connection succesful'))
//   .catch((err) => console.error(err));;

//   //=================================
// var passport                    = require("passport"),
//     LocalStrategy               = require("passport-local").Strategy;
   


  
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

//   app.use(require("express-session")({
//     secret: "Rusty the world",
//     resave: false,
//     saveUninitialized: false
// }));

// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());
//Authentication


//==========SEED Part

// app.get("/book",function(req,res){
       
//   Book.create({title:"How to Turn Challenging Situations Around",author:"Gary and Lynne Bartlett",imgurl:"https://www.free-ebooks.net/2d_covers/large/1156798713.jpg",downurl:"https://www.free-ebooks.net/ebook/How-to-Turn-Challenging-Situations-Around/pdf"},function(err,book){
//       if (err){
//            res.send(err.message);
         
//       }else {
//        console.log(book);
//        res.redirect("/");
//       }
//   });
// })



//======================


// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html')); //path installation required
  //res.sendFile("../dist/index.html'");
});






/**
 * Get port from environment and store in Express.
 */
var port = process.env.PORT || '3000';



app.listen(port,function(){
  console.log("Server has started")
})