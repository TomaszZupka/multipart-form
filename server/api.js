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
            first_name: req.body.firstName,
            last_name: req.body.lastName,
            date_of_birth: req.body.dateOfBirth,
            martial_status: req.body.martialStatus,
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
            property_type: req.body.propertyType,
            built_year: req.body.builtYear,
            bedrooms_num: req.body.bedroomsNum,
            bathrooms_num: req.body.bathroomsNum,
            ownership_type: req.body.ownershipType,
            adults_num: req.body.adultsNum,
            children_num: req.body.childrenNum,
            smokers: req.body.smokers,
            long_term_unoccupied: req.body.longTermUnoccupied,
            short_term_unoccupied: req.body.shortTermUnoccupied
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