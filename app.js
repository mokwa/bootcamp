var express = require("express");
var app = express();
var bodyParser = require("body-parser");

var campgrounds = [
    {name: "Salmon Creek", image: "https://www.photosforclass.com/download/pixabay-1031139?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2Fe835b20e29f7083ed1584d05fb1d4e97e07ee3d21cac104490f3c77fa3efb3b1_960.jpg&user=Free-Photos"},
    {name: "Granite Hill", image: "https://www.photosforclass.com/download/flickr-7121865553"},
    {name: "Montain Goat's Rest", image: "https://www.photosforclass.com/download/flickr-2164766085"},
    {name: "Salmon Creek", image: "https://www.photosforclass.com/download/pixabay-1031139?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2Fe835b20e29f7083ed1584d05fb1d4e97e07ee3d21cac104490f3c77fa3efb3b1_960.jpg&user=Free-Photos"},
    {name: "Granite Hill", image: "https://www.photosforclass.com/download/flickr-7121865553"},
    {name: "Montain Goat's Rest", image: "https://www.photosforclass.com/download/flickr-2164766085"}

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