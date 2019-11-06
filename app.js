const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');


//Passport Config
require('./config/passport')(passport);

// DB Config 
const db = require('./config/keys').MongoURI;
//Connect to Mongo 
mongoose.connect(db, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log('mongodb connected'))
    .catch(err => console.log(err));

//EJS Views 
app.set('view engine', 'ejs');

// BodyParser
app.use(express.urlencoded({ extended: false }));


// Express session
app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    })
);


//connect flash
app.use(flash());
//cookieparser
app.use(cookieParser());



//passing passport to routes//
//Passport Mildware
app.use(passport.initialize());
app.use(passport.session());




// Global Variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});


//Routes redirecting

app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

app.use(express.static(path.join(__dirname + '/public/')))


app.listen(PORT, () => console.log('server start on port ' + PORT));