const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
var secret = require('./config/secret');
var engine = require('ejs-mate');
const ejs = require('ejs');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');

//initialise the express application

const app = express();

//connect to the mlab database

mongoose.connect(secret.database, function(err){
	if (err){
		console.log(err);
	}
	else{
		console.log("connected to the database");
	}
});


app.use(express.static(__dirname + '/public'));
app.engine('ejs', engine);
app.set('view engine' ,'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(morgan('dev'));
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(session({
	resave : true, 
	saveUninitialized : true,
	secret : "abc",
	store: new MongoStore({url: secret.database, autoRedirect : true})
}));
app.use(flash());
app.use(function(req, res, next){
	res.locals.user = req.user;
	next();
});

require('./routes/main')(app);
require('./routes/user')(app);


app.listen(8080, function(err){

	if(err){
		console.log(err);
	}
	else{
		console.log("Running on port: "+ secret.port);
	}
});