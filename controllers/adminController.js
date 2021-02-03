const { restart } = require("nodemon");

const Post = require('../models/postModel').Post;



module.exports = {
    index: (req, res) => {
      res.render('admin/index');
    },
    
    getPosts: (req, res) => {
      Post.find().lean().then(posts => {
        res.render('admin/posts/index', {posts: posts});
      });
    },

    submitPosts: (req, res) => {
      console.log(req.body);
      const newPost = new Post({
        title: req.body.title,
        description: req.body.description,
        status: req.body.status
      });

      console.log("JEREMY", newPost);

      newPost.save().then(post => {
        console.log(post);
        req.flash('success-message', 'Post created successfully.');
        res.redirect('/admin/posts');
      }, err => console.log(err))
    },

    createPosts: (req, res) => {
      res.render('admin/posts/create');
    },

    editPost: (req, res) => {
      const id = req.params.id;
      Post.findById(id).then(post => {
        res.render('admin/posts/edit', {post: post});
      }) 
    }
};