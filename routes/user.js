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
	})




	/*app.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

*/

}