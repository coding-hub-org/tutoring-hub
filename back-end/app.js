var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
<<<<<<< HEAD
var tutorsRouter = require('./routes/tutor');

=======
var loginRouter = require('./routes/login');
var signupRouter = require('./routes/signup');
var logoutRouter = require('./routes/logout');
var settingRouter = require('./routes/setting');
>>>>>>> 01efb619e8a64e78337b18b92a5a357d7ad1bb11

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: "It's a secret!" }));

app.use('/', indexRouter);
app.use('/users', usersRouter);
<<<<<<< HEAD
app.use('/tutor', tutorsRouter);

=======
app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.use('/logout', logoutRouter);
app.use('/setting', settingRouter);
>>>>>>> 01efb619e8a64e78337b18b92a5a357d7ad1bb11

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
