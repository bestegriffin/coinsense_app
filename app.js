var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var port = process.env.PORT || 3000
var app = express();
mongoose.Promise = require('bluebird');

// use sessions for tracking logins
app.use(session({
    secret: 'Crypto loves you',
    resave: true,
    saveUninitialized: false
}));

// make user ID available in templates
app.use(function(req, res, next) {
    res.locals.currentUser = req.session.userId;
    next();
});

// mongodb connection
// development db
// mongoose.connect("mongodb://localhost:27017/coinSense", { useMongoClient: true });

// // deployment db
mongoose.connect("mongodb://heroku_skn5zmbj:e9PoDTXwzlJoulQZXn2Rx-fSCTRp5mkJ@ds251277.mlab.com:51277/heroku_q941fpr3");

var db = mongoose.connection;
// mongo error
db.on('error', console.error.bind(console, 'connection error:'));

// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// serve static files from /public
app.use(express.static(__dirname + '/public'));

// view engine setup
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

// include routes
var routes = require('./routes/index');
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('File Not Found');
    err.status = 404;
    next(err);
});

// error handler
// define as the last app.use callback
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});



// listen on port 3000
app.listen(port, function() {
    console.log('Express app listening on port  ' + port);
});