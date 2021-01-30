module.exports = {
    index: (req, res) => {
      res.render('default/index');
},
    loginGet: (req, res) => {
      res.render('default/login');
},

    loginPost: (req, res) => {
      res.send("Congratulations, you have successfully submitted the data")
  }

}