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
      const commentsAllowed = req.body.allowComments ? true: false;

      const newPost = new Post({
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        allowComments: commentsAllowed
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
    },

    deletePost: (req, res) => {

      Post.findByIdAndDelete(req.params.id)
          .then(deletedPost => {
            req.flash('success-message', `The post ${deletedPost.title} has been deleted.`);
            res.redirect('/admin/posts');
          });
    }
};