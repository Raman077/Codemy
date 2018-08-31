const passport = require('passport');
const passportConf = require('../config/passport');

module.exports = function(app){

	app.get('/login', function(req, res, next){
		//console.log("hello")
		res.render('accounts/login');
	});

	app.get('/auth/google', passport.authenticate('google', {scope: 'email'}));

	app.get('/auth/google/callback', passport.authenticate('google', {
		successRedirect : '/profile',
		failureRedirect : '/login'
	}));

	app.get('/logout', function(req, res, next){
		req.logout();
		res.redirect('/');
	});


	app.get('/profile', function(req, res, next){
		res.render('accounts/profile', {message : req.flash('loginMessage')});
	});

}
