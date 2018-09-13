const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

module.exports = {

    register: function (req, res) {
        console.log('AAAAAAAAA')
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
                        password: req.body.password
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
        .catch(err => {
            res.status(500).json({success: false, message: err})
        })
    },

    login: function(req, res) {
        User.findOne({
            email: req.body.email,
            password: req.body.password
        })
        .then(data => {
            if (data) {
                jwt.sign({
                    email: req.body.email
                }, 'secret', (err,token) => {
                    if (err) {
                        res.status(500).json({message: err})
                    } else {
                        res.status(201).json({token: token})
                    }
                })
            } else {
                res.status(500).json({message: 'Wrong password / email'})
            }
        })
        .catch(err => {
            res.status(500).json({message: err})
        })
    }
}