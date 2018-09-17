var User = require('../models/user')
var jwt = require('jsonwebtoken');

module.exports = {
  isLogin: function(req, res, next) {
    let token = req.headers.access_token
    if(!token) {
      res.status(401).json({
        error: 'token must be existed'
      })
    } else {
      var decoded = jwt.verify(token, process.env.JWT_KEY);
      User.findOne({
        email: decoded.email
      }, function(err, user) {
        if(user) {
          req.user = user
          next()
        } else {
          res.status(401).json({
            error: 'token invalid'
          })
        }
      })
    }
  }
}
