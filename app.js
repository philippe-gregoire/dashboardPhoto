/*--*******************************************************************************
* Copyright (c) 2016 IBM Corporation and other Contributors.
*
* All rights reserved. 
*
* Contributors: CLEMENCE LEBRUN
* IBM - Initial Contribution
********************************************************************************/
var express = require('express');
var path = require('path');
var routes = require('./routes');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var request = require('request');
var cfenv = require('cfenv');

var index = require('./routes/index');
var ibmdb = require('ibm_db');
var app = express();
var http_host = (process.env.VCAP_APP_HOST || '0.0.0.0');
var http_port = (process.env.VCAP_APP_PORT || 7000);

app.set('port', http_port);
app.set('host',http_host);

app.set('views', __dirname + '/public');

// used below code to render html files
app.engine('html', require('ejs').renderFile);

app.set('view engine', 'ejs');
//use favicon
app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
// add session to store the api-key and auth token in the session
app.use(session({secret: 'iotfCloud123456789',saveUninitialized: true,
                 resave: true}));
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();
var weather_host = appEnv.services["weatherinsights"]
? appEnv.services["weatherinsights"][0].credentials.url // Insights for Weather credentials passed in
: ""; // or copy your credentials url here for standalone

function weatherAPI(path, qs, done) {
    var url = weather_host + path;
    console.log(url, qs);
    request({
        url: url,
        method: "GET",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            "Accept": "application/json"
        },
        qs: qs
    }, function(err, req, data) {
        if (err) {
            done(err);
        } else {
            if (req.statusCode >= 200 && req.statusCode < 400) {
                try {
                    done(null, JSON.parse(data));
                } catch(e) {
                    console.log(e);
                    done(e);
                }
            } else {
                console.log(err);
                done({ message: req.statusCode, data: data });
            }
        }
    });
}

app.get('/api/forecast/daily', function(req, res) {
    weatherAPI("/api/weather/v2/forecast/daily/10day", {
        geocode: req.query.geocode || "34.53,84.50",
        units: req.query.units || "m",
        language: req.query.language || "en"
    }, function(err, result) {
        if (err) {
            res.send(err).status(400);
        } else {
            res.json(result);
        }
    });
});

app.get('/api/forecast/hourly', function(req, res) {
    weatherAPI("/api/weather/v2/forecast/hourly/24hour", {
        geocode: req.query.geocode || "45.42,-75.68",
        units: req.query.units || "m",
        language: req.query.language || "en"
    }, function(err, result) {
        if (err) {
            res.send(err).status(400);
        } else {
            res.json(result);
        }
    });
});

app.use('/',index);

app.use(function(req, res, next) {
    if(req.session.api_key){
        //console.log("OK apikey");
        res.redirect("/dashboard");
    }   
    else{
        console.log("error apikey");
    }
        
});

var server = app.listen(app.get('port'), app.get('host'), function() {
  console.log('Express server listening on ' + server.address().address + ':' + server.address().port);
});


module.exports = app;
