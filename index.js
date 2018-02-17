var express 				= require('express');
	app 					= express();
	mongoose 				= require('mongoose');
	expressSanitizer 		= require("express-sanitizer");
	bodyParser    			= require("body-parser");
	methodOverride 			= require("method-override"),
	passport 				= require('passport'),
	User					= require("./models/user"),
	LocalStrategy 			= require('passport-local'),
	passportLocalMongoose 	= require('passport-local-mongoose');


app.set("view engine", "ejs");
var port = 3000;

app.use(express.static("public"));
//Sanitizing inputs
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());

app.use(methodOverride("_method"));

//For user auth
app.use(require("express-session")({
	secret: "Xe_jL)x5zkXtkx]Z",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	next();
});

mongoose.connect("", {useMongoClient:true}); //db connection URL w/pass in quotes
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
	console.log("Database is connected");
});

//---------------------Schemas----------------------

	//Project schema
var projectSchema = mongoose.Schema({
	name: String,
	description: String,
	summary: String,
	image: String,
	githubURL: String,
	learned: String,
	skills: String,
	link: String
});

var Project = mongoose.model("Project", projectSchema);


//----------------------Routes--------------------------

app.get("/", function(req, res){
	res.redirect("/resume");
});

app.get("/admin", isLoggedIn, function(req, res){
	Project.find({}, function(err, projects){
		if(err){
			console.log(err);
		} 
		else{
			res.render("admin", {projects: projects});
		}
	});
});

app.get("/resume", function(req, res){
	Project.find({}, function(err, projects){
		if(err){
			console.log(err);
		} 
		else{
			res.render("resume", {projects: projects});
		}
	});
});

//index (lists all projects)
app.get("/portfolio", function(req, res){
	Project.find({}, function(err, projects){
		if(err){
			console.log(err);
		} 
		else{
			res.render("resume", {projects: projects});
		}
	});
});

//new
app.get("/new", isLoggedIn, function(req, res){
	Project.find({}, function(err, projects){
		if(err){
			console.log(err);
		}
		else{
			res.render("new", {projects: projects});
		}
	});
});

//create
//Should this be removed, only authenticated users can post?
app.post("/portfolio", function(req, res){
	//SANITATION OFF
	//req.body.project.name = req.sanitize(req.body.project.name);
	//req.body.project.description = req.sanitize(req.body.project.description);
	//req.body.project.image = req.sanitize(req.body.project.image);
	//req.body.project.githubURL = req.sanitize(req.body.project.githubURL);
	Project.find({}, function(err, projects){
		if(err){
			console.log(err);
		}
		else{
			Project.create(req.body.project, function(err, newProject){
				if(err){
					res.render("new");
					console.log(err);
				}
				else{
					res.redirect("/portfolio");
				}
			});
		}
	});
});

//show
app.get("/portfolio/:id", function(req, res){
	Project.find({}, function(err, projects){
			if(err){
				console.log(err);
			} 
			else{
				Project.findById(req.params.id, function(err, foundProject){
					if(err){
						res.redirect("/portfolio");
					}
					else{
						res.render("show", {project: foundProject, projects: projects});
					}
				});
			};
	});
});

//edit
app.get("/portfolio/:id/edit", isLoggedIn, function(req, res){
	Project.find({}, function(err, projects){
			if(err){
				console.log(err);
			} 
			else{
				Project.findById(req.params.id, function(err, foundProject){
					if(err){
						res.redirect("/portfolio");
					}
					else{
						res.render("edit", {project: foundProject, projects: projects});
					}
				});
			};
	});
});

//update
app.put("/portfolio/:id", isLoggedIn, function(req, res){
	Project.find({}, function(err, projects){
		if(err){
			console.log(err);
			res.redirect("/");
		} 
		else{
			//SANITATION OFF
			//req.body.project.name = req.sanitize(req.body.project.name);
			//req.body.project.description = req.sanitize(req.body.project.description);
			//req.body.project.image = req.sanitize(req.body.project.image);
			//req.body.project.githubURL = req.sanitize(req.body.project.githubURL);
			Project.findByIdAndUpdate(req.params.id, req.body.project, function(err, updatedProject){
				if(err){
				    res.redirect("/portfolio");
				} else{
				    res.redirect("/portfolio/" + req.params.id);
				}
			});
		};
	});
});

//destroy
app.delete("/portfolio/:id", isLoggedIn, function(req, res){
   //destroy blog
   Project.find({}, function(err, projects){
		if(err){
			console.log(err);
		} 
		else{
		   	Project.findByIdAndRemove(req.params.id, function(err){
		      	if(err){
		         	res.redirect("/admin");
		      	} else{
		         	res.redirect("/admin");
		      	}
		  	});
		};
	});
});

//==========Routes Used for user Auth==============

//register routes

/*
app.get("/register", function(req, res){
	Project.find({}, function(err, projects){
		if(err){
			console.log(err);
		} 
		else{
			res.render("register", {projects: projects});
		}
	});
});
app.post("/register", function(req, res){
	req.body.username = req.sanitize(req.body.username);
	req.body.password = req.sanitize(req.body.password);

	User.register(new User({username: req.body.username}), req.body.password, function(err, user){
		if(err){
			console.log(err);
			return res.render('register');
		}
		passport.authenticate("local")(req, res, function(){
			res.redirect("/admin");
		});
	});
});
*/

//Login routes
app.get("/login", function(req, res){
	Project.find({}, function(err, projects){
		if(err){
			console.log(err);
		} 
		else{
			res.render("login", {projects: projects});
		}
	});
});

app.post("/login", passport.authenticate("local", {
	successRedirect: "/admin",
	failureRedirect: "/login"
}) ,function(req, res){

});

app.get("/logout", function(req, res){
	req.logout();
	res.redirect("/");
})

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}


app.get("*", function(req, res){
	res.send("404 Error: Page not found");
});

app.listen(process.env.PORT || port, function(){
	console.log('Portfolio site is listening');
});
