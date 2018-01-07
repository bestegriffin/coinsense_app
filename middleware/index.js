var express = require('express');
var multer = require('multer'),
bodyParser = require('body-parser'),
path = require('path');

var app = new express();
app.use(bodyParser.json());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.get('/profile', function (req, res) {
  res.render('profile');
});

app.post('profile', multer({ dest: './uploads/' }).single('upl'), function (req, res) {
  console.log(req.body); 
  console.log(req.file); 
  res.status(204).end();
});



function loggedOut(req, res, next) {
  if (req.session && req.session.userId) {
    return res.redirect('/profile');
  }
  return next();
}
function requiresLogin(req, res, next) {
  if (req.session && req.session.userId) {
    return next();
  } else {
    var err = new Error('You must be logged in to view this page.');
    err.status = 401;
    return next(err);
  }
}


module.exports.loggedOut = loggedOut;
module.exports.requiresLogin = requiresLogin;
