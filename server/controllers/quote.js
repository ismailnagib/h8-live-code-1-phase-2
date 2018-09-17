var Quote = require('../models/quote')
const translate = require('google-translate-api');

module.exports = {
    all: function(req, res) {
      Quote.find({}, function(err, data) {
        if (err) {
          res.json({error: err})
        } else {
          res.status(200).json(data)
        }
      });
    },
    // articlesByCategory: function(req, res) {
    //   Category.findOne({name: req.params.name}, function(err, category) {
    //     if (err) {
    //       res.json({error: err})
    //     } else {
    //       Article.find({category: category.id}, function(err, articles) {
    //         if (err) {
    //           res.json({error: err})
    //         } else {
    //           res.status(200).json(articles)
    //         }
    //       });
    //     }
    //   });
    // },
    create: function(req, res) {
      Quote.create({
        status: req.body.status,
        user: req.user.id
      }, function (err, quote) {
        if (err) {
          res.json({error: err})
        } else {
          res.json(quote)
        }
      });
    },
    update: function(req, res) {
      Quote.findById(req.params.id, function (err, data) {
        if(String(data.user) == String(req.user._id)) {
          let update_obj = {
            status: req.body.status || data.status
          }

          Quote.update({_id: req.params.id}, update_obj, function(err, data) {
            if (err) {
              res.status(400).json({error: err})
            } else {
              res.status(200).json(data)
            }
          })
        } else {
          res.status(400).json({error: "user is not a valid author"})
        }


      });
    },
    delete: function(req, res) {
      Quote.findById(req.params.id, function (err, data) {
        if(String(data.user) == String(req.user._id)) {
          Quote.remove({ _id: req.params.id }, function(err, data) {
            if (err) {
              res.status(400).json({error: err})
            } else {
              res.status(200).json(data)
            }
          });
        } else {
          res.status(400).json({error: "user is not a valid author"})
        }
      });
    },
    translate: function(req, res) {
      translate(req.body.text, {to: 'id'}).then(translate_result => {
        res.status(200).json({ result: translate_result.text})
      }).catch(err => {
        console.error(err);
      });
    }
}
