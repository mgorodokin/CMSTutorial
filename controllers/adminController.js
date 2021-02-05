const { restart } = require("nodemon");

const Post = require('../models/postModel').Post;
const Category = require('../models/categoriesModel').Category;
const {isEmpty} = require('../config/customFunctions');


module.exports = {
    index: (req, res) => {
      res.render('admin/index');
    },
    
    getPosts: (req, res) => {
      Post.find().lean()
      .populate('category')
      .then(posts => {
        res.render('admin/posts/index', {posts: posts});
      });
    },

    submitPosts: (req, res) => {
      const commentsAllowed = req.body.allowComments ? true: false;

      /* check for any input file */
      let filename = '';

      if(!isEmpty(req.files)) {
        let file = req.files.uploadedFile;
        filename = file.name;
        let uploadDir = './public/uploads/';

        file.mv(uploadDir+filename, (err) => {
          if(err)
            throw err
        });
      }

      const newPost = new Post({
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        allowComments: commentsAllowed,
        category: req.body.category,
        file: `/uploads/${filename}`
      });

      newPost.save().then(post => {
        console.log(post);
        req.flash('success-message', 'Post created successfully.');
        res.redirect('/admin/posts');
      }, err => console.log(err))
    },

    createPosts: (req, res) => {
      Category.find().then(cats => {
        res.render('admin/posts/create', {categories: cats});
      });
    },

    editPost: (req, res) => {
      const id = req.params.id;
      Post.findById(id)
           .then(post => {
        Category.find().then(cats => {
          res.render('admin/posts/edit', {post: post, categories: cats});
        })
      }) 
    },

    editPostSubmit: (req, res) => {
      const commentsAllowed = req.body.allowComments ? true: false;

      const id = req.params.id;
      Post.findById(id)
           .then(post => {
              post.title = req.body.title;
              post.statuus = req.body.status;
              post.allowComments = req.body.allowComments;
              post.description = req.body.description;
              post.category = req.body.category;

              post.save().then(updatedPost => {
                req.flash('success-message', `The post ${updatedPost.title} has been updated.`)
                res.redirect('/admin/posts');
              })
        })
    },

    deletePost: (req, res) => {

      Post.findByIdAndDelete(req.params.id)
          .then(deletedPost => {
            req.flash('success-message', `The post ${deletedPost.title} has been deleted.`);
            res.redirect('/admin/posts');
          });
    },

    /* ALL CATEGORY METHODS */

    getCategories: (req, res) => {
      Category.find().then(cats => {
        res.render('admin/category/index', {categories: cats});
      });
    },

    createCategories: (req, res) => {
      var categoryName = req.body.name;
      
      if(categoryName) {
        const newCategory = new Category({
          title: categoryName
        });

        newCategory.save().then(category => {
          res.status(200).json(category);
        })
      }
    },

    editCategoriesGetRoute: async (req, res) => {
      const catId = req.params.id;

      const cats = await Category.find();


      Category.findById(catId).then(cat => {

          res.render('admin/category/edit', {category: cat, categories: cats});

      })
  },


  editCategoriesPostRoute: (req, res) => {
      const catId = req.params.id;
      const newTitle = req.body.name;

      if (newTitle) {
          Category.findById(catId).then(category => {

              category.title = newTitle;

              category.save().then(updated => {
                  res.status(200).json({url: '/admin/category'});
              })

          })
}},

  deleteCategory: (req, res) => {

  Category.findByIdAndDelete(req.params.id)
      .then(deletedCategory => {
        req.flash('success-message', `The category ${deletedCategory.title} has been deleted.`);
        res.redirect('/admin/category');
      });
}


}