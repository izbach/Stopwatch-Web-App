var express           = require("express"),
app                   = express(),
bodyParser            = require("body-parser"),
mongoose              = require("mongoose"),
LocalStrategy         = require("passport-local"),
passportLocalMongoose = require("passport-local-mongoose"),
passport              = require("passport"),
Swimmer               = require("./models/Swimmer.js"),
User                  = require("./models/user")

mongoose.connect("mongodb://localhost:27017/YMCAclub", {useNewUrlParser: true, useUnifiedTopology:true})
app.use(bodyParser.urlencoded({extended: true}))
app.set("view engine", "ejs");
app.use(express.static('/home/isaac/Programming/WebDev/Stopwatch web app/views/resources'));
app.use(require("express-session")({
    secret: "Toby is Awesome",
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

//===============================
// ROUTES
//===============================

app.get("/", function(req, res){
    Swimmer.find({}, function(err, allSwimmers){
        if(err){
            console.log(err);
        }else{
            res.render("landing", {swimmers: allSwimmers});
        }
    });
});

app.get("/timer", function(req, res){
    res.render("timer")
})
//landing page
//Swimmers times table


//timing page
//adding swimmers page
//Want this app to import from a csv file

//==========================
//AUTH ROUTES
//==========================

//show sign up form
app.get("/register", function(req, res){
    res.render("register")
})

app.post("/register", function(req, res){
    req.body.email
    req.body.password
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render('register');
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/");
        })
    })
})

//login routes

app.get("/login", function(re, res){
    res.render("login")
})

app.post("/login", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login"
}), function(req, res){

})

app.get("/logout", function(req, res){
    req.logout();
    res.redirect('/')
})
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login")
}



// Swimmer.create({
//     first_name: "George",
//     last_name: "Foreman",
//     age: 10,
//     gender: "M",
//     email: "foremantheman@gmail.com"

// }, function(err, campground){
//     if(err){
//         console.log(err)
//     }else{
//         console.log("NEWLY CREATED SWIMMER: ");
//         console.log(campground);
//     }
// })





app.listen(3000, function(){
    console.log("app is listening on port 3000");
})