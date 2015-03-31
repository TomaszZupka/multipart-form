'use strict';

var express = require('express'),
    router = express.Router(),
    models = require('./models');

//router.use(function (req, res, next) { //middleware
//    res.setHeader('Access-Control-Allow-Origin', '*');
//    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//    res.setHeader('Access-Control-Allow-Credentials', true);
//    next();
//});

router.route('/users')
    .get(function (req, res) {
        models.User.find(function (err, users) {
            if (err) {
                res.send(err);
            }
            res.json(users);
        });
    })
    .post(function (req, res) {
        var user = new models.User({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            date_of_birth: req.body.date_of_birth,
            martial_status: req.body.martial_status,
            email: req.body.email
        });
        user.save(function (err) {
            if (err) {
                res.send(err);
            }
            res.status(201).json({
                _id: user._id
            });
        });
    });

router.route('/users/:user_id')
    .get(function (req, res) {
        models.User.findOne({
            _id: req.params.user_id
        }, function (err, user) {
            if (err) {
                res.send(err);
            }
            res.json(user);
        });
    });

router.route('/users/:user_id/properties')
    .get(function (req, res) {
        models.Property.find({
            user_id: req.params.user_id
        }, function (err, properties) {
            if (err) {
                res.send(err);
            }
            res.json(properties);
        });
    })
    .post(function (req, res) {
        var property = new models.Property({
            user_id: req.params.user_id,
            property_type: req.body.property_type,
            built_year: req.body.built_year,
            bedrooms_num: req.body.bedrooms_num,
            bathrooms_num: req.body.bathrooms_num,
            ownership_type: req.body.ownership_type,
            adults_num: req.body.adults_num,
            children_num: req.body.children_num,
            smokers: req.body.smokers || false,
            long_term_unoccupied: req.body.long_term_unoccupied || false,
            short_term_unoccupied: req.body.short_term_unoccupied || false
        });
        property.save(function (err) {
            if (err) {
                res.send(err);
            }
            res.status(201).json({
                _id: property._id
            });
        });
    });

router.route('/users/:user_id/properties/:property_id')
    .get(function (req, res) {
        models.Property.findOne({
            user_id: req.params.user_id,
            _id: req.params.property_id
        }, function (err, property) {
            if (err) {
                res.send(err);
            }
            res.json(property);
        });
    });

module.exports = router;