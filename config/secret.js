module.exports = {
	database :'mongodb://root:hallabol7@ds231991.mlab.com:31991/codedemons',
	port : 3000,

	google:{
		clientID: '57111151407-b5rn9krc8cntplsouvmdo0siecdhu3mq.apps.googleusercontent.com',
		clientSecret: 'o0ceUUs9VWt73yjp8K_vhuBt',
		profileFields: ['emails','displayName'],
		callbackURL: 'http://localhost:3000/auth/google/callback'
	}
}