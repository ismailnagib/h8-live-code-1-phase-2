var express = require('express');
var router = express.Router();
var middleware = require('../middlewares/authentication.js')
var QuoteController = require('../controllers/quote')

router.get('/', QuoteController.all);
// router.get('/:id', ArticleController.findById );
router.post('/', middleware.isLogin, QuoteController.create);
router.post('/translate', middleware.isLogin, QuoteController.translate);

router.put('/:id', middleware.isLogin, QuoteController.update );
router.delete('/:id', middleware.isLogin, QuoteController.delete)

module.exports = router;
