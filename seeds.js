var mongoose = require("mongoose");
var Campground = require("./models/campgrounds");
var Comment = require("./models/comment");

var data = [
    {
        name:"Provincial Park", 
        image:"http://farm9.staticflickr.com/8605/16573646931_22fc928bf9_o.jpg",
        description:"Lorem ipsum dolor sit amet, etiam tincidunt at quis. Nec leo lobortis id dictum amet ac, at labore hac, vestibulum lobortis, suscipit lobortis dui sed. Tortor pharetra sed ut ligula. Fringilla nunc libero a vivamus libero, ac felis dui posuere hac quis suspendisse. Porta quisque mollis"
    },
    {
        name:"Dry River", 
        image:"https://newhampshirestateparks.reserveamerica.com/webphotos/NH/pid270015/0/540x360.jpg",
        description:"Lorem ipsum dolor sit amet, etiam tincidunt at quis. Nec leo lobortis id dictum amet ac, at labore hac, vestibulum lobortis, suscipit lobortis dui sed. Tortor pharetra sed ut ligula. Fringilla nunc libero a vivamus libero, ac felis dui posuere hac quis suspendisse. Porta quisque mollis"
    },
    {    
        name:"OHSA", 
        image:"https://img-aws.ehowcdn.com/340x221p/photos.demandstudios.com/getty/article/110/101/87793201.jpg",
        description:"Lorem ipsum dolor sit amet, etiam tincidunt at quis. Nec leo lobortis id dictum amet ac, at labore hac, vestibulum lobortis, suscipit lobortis dui sed. Tortor pharetra sed ut ligula. Fringilla nunc libero a vivamus libero, ac felis dui posuere hac quis suspendisse. Porta quisque mollis"
    },      
    {
       name:"Road Trip USA", 
       image:"http://www.road-trip-usa.com/uploads/6/1/9/4/61940309/ventana-campground-campgrounds-in-big-sur_orig.jpg",
       description:"Lorem ipsum dolor sit amet, etiam tincidunt at quis. Nec leo lobortis id dictum amet ac, at labore hac, vestibulum lobortis, suscipit lobortis dui sed. Tortor pharetra sed ut ligula. Fringilla nunc libero a vivamus libero, ac felis dui posuere hac quis suspendisse. Porta quisque mollis"
    }
]

function seedDB(){
    //Remove all campgrounds
    Campground.deleteMany({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds");
        //add a few campgrounds
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err);
                } else{
                    console.log("added a campground");
                    //create a cooment
                    Comment.create(
                        {
                            text: "This place is great, but I wish there was Internet.",
                            author: "Hommer"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else{
                                campground.comments.push(comment);
                                campground.save();
                                console.log("created new comment");
                            }
                            
                        });
                }
            });
        });
    })
    
}

module.exports = seedDB;
