var express = require('express');
var app = express();
var router = require('./router');
var mongoose = require('mongoose');
var dbConfig = require('./db.config');
var db = require('./user.model');
const cors = require('cors');
app.use(cors());

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.json());

app.use(urlencodedParser);
app.use('/user', router, (req, res) => {
  res.status(200).json({
    isLoggedIn: true,
    success: true,
    token: req.token,
    message: 'Auth OK',
  });
});

mongoose
  .connect('mongodb://localhost:27017/db_user')
  .then(() => {
    console.log('Successfully connect to MongoDB.');
  })
  .catch((err) => {
    console.log('====>', err);
  });
app.listen(8080, () => {
  console.log('success : 8080');
});
