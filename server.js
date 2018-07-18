const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
var secret = require('./config/secret');
var engine = require('ejs-mate');
const ejs = require('ejs');

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

require('./routes/main')(app);


app.listen(8080, function(err){

	if(err){
		console.log(err);
	}
	else{
		console.log("Running on port"+ secret.port);
	}
});