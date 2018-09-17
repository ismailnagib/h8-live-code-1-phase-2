var express = require('express');
var router = express.Router();
var UserController = require('../controllers/user')
var middleware = require('../middlewares/authentication.js')

/* GET users listing. */
router.get('/', UserController.all);

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/checklogin', middleware.isLogin, (req, res) => {res.status(200).json({isLogin: true})})

module.exports = router;
