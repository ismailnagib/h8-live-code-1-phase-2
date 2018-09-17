var User = require('../models/user')
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

module.exports = {
  register: function(req, res, next) {
    //encrypt password
    var salt = bcrypt.genSaltSync(10);
    var hashedPassword = bcrypt.hashSync(req.body.password, salt);

    User.findOne({
      email: req.body.email
    })
    .then(data => {
      if(data) {
          res.status(500).json({success: false, message: 'Email has been registered before'})
      } else {
        if (req.body.password.length >= 6) {
            User.create({
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword
            })
            .then(() => {
                res.status(201).json({success: true, message: `Account ${req.body.name} registered`})
            })
            .catch(err => {
                res.status(500).json({success: false, message: err})
            })
        } else {
            res.status(500).json({success: false, message: 'Password should contain at least 6 characters'})
        }
      }
    })
  },
  login: function(req, res, next) {
    User.findOne({
      email: req.body.email
    }, function(err, user) {
      if(user) {
        let passwordValid = bcrypt.compareSync(req.body.password.toString(), user.password)
        if(passwordValid) {
          var token = jwt.sign({ email: user.email }, process.env.JWT_KEY);
          res.status(200).json({
            token: token,
            user_id: user._id
          })
        } else {
          res.status(400).json({message: 'wrong password'})
        }
      } else {
        res.status(400).json({message: 'user doesnt exist'})
      }
    })
    //
  },
  all: function(req, res, next) {
    User.find({}, function(err, users) {
      res.status(200).json({users})
    })
  }
}
