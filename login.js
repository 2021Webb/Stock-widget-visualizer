var express=require("express");
var bodyParser=require("body-parser");
  
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/gfg');
var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
    console.log("connection succeeded");
})
  
var app=express()
  
  
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
  
app.post('/login', function(req,res){
    var email =req.body.email;
    var passs = req.body.passs;
  
    var data = {
        "email":email,
        "password":passs,
    }

    var filter = {
        "password":{$exists:true, $size:0}
    }

    
    db.collection("details").find(data).toArray(function(err, result) {
    if (err) throw err;
    var ress = result;
    console.log("Res variable");
    console.log(ress);
    if(ress.length == 0)
    {
        return res.redirect("login_err.html");

    }
    if(ress.length>0)
    {
        return res.redirect("landing_logout.html");
    }
  });         
})
  
  
app.get('/',function(req,res){
res.set({
    'Access-control-Allow-Origin': '*'
    });
return res.redirect('landingpage.html');
}).listen(3000)
  
  
console.log("server listening at port 3000");