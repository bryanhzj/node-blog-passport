const Blog = require('../models/blog')

// blog_index, blog_details, blog_create_get, blog_create_post, blog_delete

const blog_index = (req, res, next) => {
    Blog.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('blogs/index', { title: "Home", blogs: result })
        })
        .catch((err) => {
            console.log(err)
            next()
        })
}

const blog_details = (req, res) => {
    const id = req.params.id
    Blog.findById(id)
        .then(result => {
            res.render('blogs/details', { title: "Blog details", blog: result })
        })
        .catch(err => {
            res.status(404).render('404', { title: "blog not found" })
        })
}

const blog_create_get = (req, res) => {
    const { payload: { id } } = req;
    
    res.render('blogs/create', { title: "Create a new blog" });
}

const blog_create_post = (req, res) => {
    const blog = new Blog(req.body)
    console.log(blog)

    blog.save()
        .then((result) => {
            res.redirect('/blogs')
        })
        .catch((err) => {
            console.log(err)
            res.redirect('/blogs')
        })
}

const blog_delete = (req, res) => {
    const id = req.params.id

    Blog.findByIdAndDelete(id)
        .then((result) => {
            res.json({ redirect: '/blogs' })
        })
        .catch(err => {
            console.log(err)
        })
}

module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete
}