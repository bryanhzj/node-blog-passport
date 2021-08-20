const { Router } = require('express')
const passport = require('passport')

const mongoose = require('mongoose')
const auth = require('./auth')
const User = require('../models/user')

require('../config/passport');

const authController = require('../controllers/authController')

const router = Router()

router.get('/register', authController.register_get)

router.post('/register', auth.optional, (req, res, next) => {
    if (!req.body.email) {
        return res.status(422).json({
            errors: {
                email: 'is required',
            },
        });
    }

    if (!req.body.password) {
        return res.status(422).json({
            errors: {
                password: 'is required',
            },
        });
    }

    const finalUser = new User(req.body)
    // finalUser.setPassword(req.body.password)
        // .then(finalUser.save())
    // console.log(hashedPassword)
    return finalUser.save()
        .then(() => res.json({ user: finalUser.toAuthJSON() }))
})

router.get('/login', authController.login_get)

router.post('/login', auth.optional, (req, res, next) => {
    if (!req.body.email) {
        return res.status(422).json({
            errors: {
                email: 'is required',
            },
        });
    }

    if (!req.body.password) {
        return res.status(422).json({
            errors: {
                password: 'is required',
            },
        });
    }

    passport.authenticate('local', { failureRedirect: '/login' })

    // return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
    //     if (err) {
    //         return next(err)
    //     }
    //     if(passportUser) {
    //         const user = passportUser;
    //         user.token = passportUser.generateJWT();
      
    //         return res.json({ user: user.toAuthJSON() });
    //     }
      
    //     return res.status(400).info;
    // })(req, res, next);
})

// const authController = require('../controllers/authController')

// const router = Router()

// require('../config/passport');

// router.get('/register', authController.register_get)
// router.post('/register', passport.authenticate('register', { 
//     successRedirect : '/blogs',
//     failureRedirect : '/register' 
// }), authController.register_post)
// router.get('/login', authController.login_get)
// router.post('/login', authController.login_post)

module.exports = router