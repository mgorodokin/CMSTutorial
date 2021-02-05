const Post = require('../models/postModel').Post;
const Category = require('../models/categoriesModel').Category;

module.exports = {
    index: async (req, res) => {

      const posts = await Post.find();

      res.render('default/index', {posts: posts});
},
    loginGet: (req, res) => {
      res.render('default/login')
},

    loginPost: (req, res) => {
      res.send("Congratulations, you have successfully submitted the data")
  },

    registerGet: (req, res) => {
      res.render('default/register')
    },

    registerPost: (req, res) => {
      res.send("Successfully Registered")
    }

}