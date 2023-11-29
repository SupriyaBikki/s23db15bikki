
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(
  function(username, password, done) {
  Account.findOne({ username: username })
  .then(function (user){
  if (err) { return done(err); }
  if (!user) {
  return done(null, false, { message: 'Incorrect username.' });
  }
  if (!user.validPassword(password)) {
  return done(null, false, { message: 'Incorrect password.' });
  }
  return done(null, user);
  })
  .catch(function(err){
  return done(err)
  })
  })
  )
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var boardRouter = require('./routes/board');
var chooseRouter = require('./routes/choose');
var employeeRouter = require('./routes/employee');
var resourceRouter = require('./routes/resource');
var employee = require("./models/employee");
const mongoose = require('mongoose');
require('dotenv').config();


const connectionString = process.env.MONGO_CON;

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
// app.use('/employe', employeRouter);
app.use('/board', boardRouter);
app.use('/choose', chooseRouter);
app.use('/employee' , employeeRouter);
app.use('/resource' , resourceRouter);


  

mongoose.connect('mongodb+srv://bikkisupriya:bikkisupriya@cluster0.jfghyqn.mongodb.net/?retryWrites=true&w=majority').
then(() => {
    console.log("DB connected");
    async function recreateDB() {
      // Delete everything
      await employee.deleteMany();
      //one instance
      let instance1 = new employee({ employee_type: "developer", department: 'IT', salary: 4000 });
      let instance2 = new employee({ employee_type: "accountant", department: 'Finance', salary: 19.4 });
      let instance3 = new employee({ employee_type: "Hiring manager", department: 'HR', cossalaryt: 10.3 });
      instance1.save().then(doc => {
        console.log("First object saved")
      }
      ).catch(err => {
        console.error(err)
      });
      instance2.save().then(doc => {
        console.log("Second object saved")
      }
      ).catch(err => {
        console.error(err)
      });
      instance3.save().then(doc => {
        console.log("Third object saved")
      }
      ).catch(err => {
        console.error(err)
      });
  
    }
  let reseed = true;
  if (reseed) { recreateDB(); }
})

.catch((err) => console.log(err.message))

// passport config
// Use the existing connection
// The Account model
var Account =require('./models/account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

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
