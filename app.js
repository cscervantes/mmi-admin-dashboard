var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var websitesRouter = require('./routes/websites');
var advanceRouter = require('./routes/advance_setting');
var articlesRouter = require('./routes/articles');
var sectionsRouter = require('./routes/sections');

var app = express();

app.use(session({
  secret: 'forever young',
  saveUninitialized: false,
  resave: false  
}))

app.use(function(req, res, next){
  var session = req.session
  res.locals.session = session
  res.locals.moment = require('moment')
  next();
})


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next){
  if(req.path === '/'){
    res.redirect('/mmi-admin-dashboard')
  }else{
    next()
  }
})


app.use('/mmi-admin-dashboard', indexRouter);
app.use('/mmi-admin-dashboard/users', usersRouter);
app.use('/mmi-admin-dashboard/websites', websitesRouter);
app.use('/mmi-admin-dashboard/advance', advanceRouter);
app.use('/mmi-admin-dashboard/articles', articlesRouter);
app.use('/mmi-admin-dashboard/sections', sectionsRouter);

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
