const mongoose = require('mongoose')
const passport = require('passport');
const localStrategy = require('passport-local');

const User = require('../models/user');

passport.use(
    new localStrategy({
		usernameField: 'email',
		passwordField: 'password'
	}, (email, password, done) => {
		User.findOne({ email })
			.then((user) => {
				if (!user) {
					return done(null, false, { message: 'User not found' });
				}
				const validate = user.validatePassword(password);
				if (!validate) {
					return done(null, false, { message: 'Wrong Password' });
				}
				return done(null, user, { message: 'Logged in Successfully' });
			})
			.catch(done)
        }
    )
);