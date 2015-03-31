'use strict';

var express = require('express'),
    app = express(),                                // create our app w/ express
    mongoose = require('mongoose'),                 // mongoose for mongodb
    morgan = require('morgan'),                     // log requests to the console (express4)
    bodyParser = require('body-parser'),            // pull information from HTML POST (express4)
    methodOverride = require('method-override'),    // simulate DELETE and PUT (express4)
    cors = require('cors'),
    path = require('path'),
    api = require('./api'),
    port = process.env.PORT || 1337;

mongoose.connect('mongodb://liberty:admin@ds041337.mongolab.com:41337/liberty-demo');
mongoose.connection.on('error', console.error.bind(console, 'connection error: '));
mongoose.connection.once('open', function (callback) {
    console.log('Connection to db is open!');
});

app.use(express.static(path.resolve('../client')));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                             // log every request to the console
app.use(bodyParser.urlencoded({'extended': 'true'}));               // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                         // parse application/json
app.use(bodyParser.json({type: 'application/vnd.api+json'}));       // parse application/vnd.api+json as json
app.use(methodOverride());
app.use(cors());                                                    // enable ALL CORS requests
app.use('/api', api);

app.get('*', function (req, res) {
    res.sendfile(path.resolve('../client/index.html'));             // load the single view file (angular will handle the page changes on the front-end)
});

app.listen(port);
console.log('App listening on port: ' + port);