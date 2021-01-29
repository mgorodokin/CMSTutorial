const express = require('express');
const mongoose = require('mongoose');
const path = require('path')
const hbs = require('express-handlebars')

const app = express();

/* Configure Mongoose to Connect MongoDB */
mongoose.connect('mongodb://localhost:27017/CMSTutorial', { useNewUrlParser: true })
    .then(response => {
        console.log("MongoDB Connected Successfully.", { useNewUrlParser: true });
    }) .catch(err => {
        console.log("Database connection failed", err)
    });

/* Configure express*/
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')));

/* Setup View Engine To Use Handlebars */
app.engine('handlebars', hbs({defaultLayout: 'default'}));
app.set('view engine', 'handlebars');

/* Routes */
app.use('/', (req, res) => {
    res.send("Welcome to the CMS App", {useNewUrlParser: true });
});


app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
})