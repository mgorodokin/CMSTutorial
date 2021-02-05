
const {globalVariables} = require('./config/configuration')

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const _handlebars = require('handlebars');
const hbs = require('express-handlebars');
const {mongoDbUrl, PORT} = require('./config/configuration');
const flash = require('connect-flash');
const session = require('express-session');
const {selectOption} = require('./config/customFunctions');
const fileUpload = require('express-fileUpload');
const methodOverride = require('method-override');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');

const app = express();

/* Configure Mongoose to Connect MongoDB */
mongoose.connect(mongoDbUrl, { useNewUrlParser: true })
    .then(response => {
        console.log("MongoDB Connected Successfully.", { useNewUrlParser: true });
    }) .catch(err => {
        console.log("Database connection failed", err)
    });



/* Configure express*/
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')));

/*flash and session*/
app.use(session({
    secret: 'anysecret',
    saveUninitialized: true,
    resave: true
}))

app.use(flash());

app.use(globalVariables);

app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  }));

/* Setup View Engine To Use Handlebars */
app.engine('handlebars', hbs( {defaultLayout: 'default', helpers: {select: selectOption}, handlebars: allowInsecurePrototypeAccess(_handlebars)}));
app.set('view engine', 'handlebars');

/* Method Override Middleware */
app.use(methodOverride('newMethod'));


/* Routes */
const defaultRoutes = require('./routes/defaultRoutes');
const adminRoutes = require('./routes/adminRoutes');

app.use('/', defaultRoutes);
app.use('/admin', adminRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port 3000`);
})