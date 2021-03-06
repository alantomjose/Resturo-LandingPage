var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var sassMiddleware = require('node-sass-middleware') ///saaasss

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();




//sass Setup
app.use(sassMiddleware({
  src: __dirname + '/public/sass', 
  dest: __dirname + '/public', 
  debug: true, 
   outputStyle: 'expanded' ,
  // prefix: 'stylesheets'
}),
// The static middleware must come after the sass middleware
express.static(path.join(__dirname, 'public'))
);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
