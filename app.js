var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose")
    Campground = require("./models/campgrounds"),
    seedDB     = require("./seeds")
     
seedDB();
mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("landing");
});

//INDEX - show all campgrounds
app.get("/campgrounds", function(req, res){
    //Get all campgrounds from DB
    Campground.find({}, function(err, allcampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("index", {campgrounds:allcampgrounds});
        }
    });
    
});

//CREATE - add new campground to database
app.post("/campgrounds", function(req, res){
    //get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newCampground = {name: name, image: image, description: description};
    //Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to campground page
            res.redirect("/campgrounds");
        }
    })
    
});

//NEW - show from to create a new campground
app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs")
})

//SHOW - show more info about one campground
app.get("/campgrounds/:id", function(req,res){
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            console.log(foundCampground);
            //render show template with that campground
           res.render("show", {campground: foundCampground})  
        }
    });
})

app.listen(8000, process.env.IP, function(){
    console.log("The YeltCamp Server Has Started!!");
});