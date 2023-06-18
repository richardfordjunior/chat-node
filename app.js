const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')

const chatRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const messagesRouter = require('./routes/messages');
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', chatRouter);
app.route('/chat/:room')
  .get(messagesRouter.listMessages)
app.route('/chat')
  .post(messagesRouter.postMessage)
app.route('/user')
  .post(usersRouter.create)
app.route('/users/:id')
  .get(usersRouter.listById)
app.route('/users/')
  .get(usersRouter.list)
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
  res.status(err.status || 500).send('error');
});

module.exports = app;
