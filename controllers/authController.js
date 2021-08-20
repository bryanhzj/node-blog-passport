const bcrypt = require('bcrypt')
const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const User = require('../models/user')

const register_get = (req, res) => {
    res.render('auth/register', { title: "Register" })
}

const register_post = async (req, res, next) => {
    res.json({
        message: 'Register successful',
        user: req.user
    })
}

const login_get = (req, res) => {
    res.render('auth/login', { title: "Login" })
}

const login_post = async (req, res, next) => {
    // passport.authenticate(
    //   async (err, user, info) => {
    //     try {
    //         if (err || !user) {
    //             const error = new Error('An error occurred.');

    //             return next(error);
    //         }

    //         req.login(user, { session: false }, async (error) => {
    //             if (error) return next(error);

    //             const body = { _id: user._id, email: user.email };
    //             const token = jwt.sign({ user: body }, 'TOP_SECRET');

    //             return res.json({ token });
    //             }
    //         );
    //     } catch (error) {
    //         return next(error);
    //     }
    //   }
    // )(req, res, next);
}

module.exports = {
    register_get,
    register_post,
    login_get,
    login_post
}