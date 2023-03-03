var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var User = require('./user.model');
const salt = bcrypt.genSaltSync(10);

router.post('/login', function (req, res, next) {
  const data = req.body;
  User.findOne(
    {
      email: req.body.email,
    },
    (err, user) => {
      if (err) {
        res.send('database error');
      } else {
        if (user === null) {
          res.send('No register');
        } else {
          console.log('jdjijdewjhmwymt1d293z21gmwjrevaytecwbe8');

          const loginValid = bcrypt.compareSync(data.password, user.password);
          if (loginValid) {
            const token = jwt.sign(
              { email: user.email },
              'jdjijdewjhmwymt1d293z21gmwjrevaytecwbe8',
              {
                expiresIn: 86400,
              }
            );
            jwt.verify(
              req.headers.token,
              'jdjijdewjhmwymt1d293z21gmwjrevaytecwbe8',
              (err, decode) => {
                if (err) {
                  console.log(err);
                } else {
                  console.log('1231231', decode);
                }
              }
            );
            console.log(jwt);
            req.token = token;
            next();
          } else {
            res.send('password error');
          }
        }
      }
    }
  );
});

router.post('/register', function (req, res, next) {
  var data = req.body;
  const user = new User({
    name: data.username,
    password: bcrypt.hashSync(data.password, salt),
    email: data.email,
  });
  User.findOne({ email: user.email }, function (err, dt) {
    if (err) {
      res.status(200).json({ message: 'database Error' });
    } else {
      console.log(dt);
      if (dt) {
        res.status(200).json({ message: 'already exist!!!' });
      } else {
        user.save((err, dt) => {
          if (err) res.status(200).json({ message: 'register error' });
          else next();
        });
      }
    }
  });
});

module.exports = router;
