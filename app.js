var express = require("express");
var app = express();
var bodyParser = require("body-parser");

var campgrounds = [
    {name: "Salmon Creek", image: "https://pixabay.com/get/e83db80d2cfd053ed1584d05fb1d4e97e07ee3d21cac104490f4c17baee9bdb0_340.jpg"},
    {name: "Granite Hill", image: "https://pixabay.com/get/ea31b10929f7063ed1584d05fb1d4e97e07ee3d21cac104490f4c17baee9bdb0_340.jpg"},
    {name: "Mountain Goat's Rest", image: "https://pixabay.com/get/eb3db30a29fd063ed1584d05fb1d4e97e07ee3d21cac104490f4c17baee9bdb0_340.jpg"},
    {name: "Kirk Creek", image: "https://pixabay.com/get/ea3cb40f2afd073ed1584d05fb1d4e97e07ee3d21cac104490f4c17baee9bdb0_340.jpg"},
    {name: "Morro Bay", image: "https://pixabay.com/get/e83db3062df51c22d2524518b7444795ea76e5d004b0144491f0c370a3e5bd_340.jpg"},
    {name: "Namakanipaio", image: "https://farm4.staticflickr.com/3319/3493312828_365d80acb7.jpg"}
]

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(req, res){
    //get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
    campgrounds.push(newCampground);
    //redirect back to campground page
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs")
})

app.listen(8000, process.env.IP, function(){
    console.log("The YeltCamp Server Has Started!!");
});