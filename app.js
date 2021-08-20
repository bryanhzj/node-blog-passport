const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const morgan = require('morgan')
const cookie = require('cookie-parser')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()

const authRoutes = require('./routes/authRoutes')
const blogRoutes = require('./routes/blogRoutes');

// express app
const app = express();

// connect to mongodb
const dbURI = process.env.DATABASE_CONNECTION

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    // listen for request after connecting to db
    .then((result) => {
        console.log('connected to db')
        app.listen(3000)
    })
    .catch((err) => console.log('error connecting to db'))

// register view engine
app.set('view engine', 'ejs');

// static files
app.use(express.static('public'))

// middleware
app.use(morgan('dev'))
app.use(cookie())
app.use(session({
    key: 'user_sid',
    secret: process.env.SESSION_SECRET,
    cookie: {
        // secure: true,
        maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
    },
    store: MongoStore.create({
        mongoUrl: dbURI,
        ttl: 14 * 24 * 60 * 60, 
        collectionName: 'sessions'
    }),
    resave: false,
    saveUninitialized: true
}))
app.use(express.urlencoded({ extended: true }))

// app.use((req, res, next) => {
//     console.log('path: ', req.path)
//     next()
// })

app.get('/', (req, res) => {
    console.log(req.session.user)
    console.log(req.cookies.user_sid)
    res.render('index', { title: "Home" });
    // res.redirect('/blogs')
})

app.get('/about', (req, res) => {
    res.render('about', { title: "About" });
})

// auth routes
app.use(authRoutes)

// blog routes
app.use('/blogs', blogRoutes)

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: "404" });
})