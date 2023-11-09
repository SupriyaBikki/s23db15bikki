
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var boardRouter = require('./routes/board');
var chooseRouter = require('./routes/choose');
var employeeRouter = require('./routes/employee');
var resourceRouter = require('./routes/resource');
var employee = require("./models/employee");


const mongoose = require('mongoose');
require('dotenv').config();

// const employee = require('./models/employee');

const connectionString = process.env.MONGO_CON;

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
// app.use('/employe', employeRouter);
app.use('/board', boardRouter);
app.use('/choose', chooseRouter);
app.use('/employee' , employeeRouter);
app.use('/resource' , resourceRouter);
// app.use('/aeroplane', aeroplaneRouter);

// mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once('open', function () {
//   console.log('Connection to DB succeeded');
// });

// mongoose.connect('mongodb+srv://bikkisupriya:bikkisupriya@cluster0.jfghyqn.mongodb.net/?retryWrites=true&w=majority').
// then(() => {
//     console.log("DB connected");
// })
// .catch((err) => console.log(err.message))

// mongoose.connect(connectionString);
// var db = mongoose.connection;+
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once('open', function () {
//   console.log('Connection to DB succeeded')
  
// });

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
