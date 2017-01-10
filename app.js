/*--*******************************************************************************
* Copyright (c) 2016 IBM Corporation and other Contributors.
*
* All rights reserved. 
*
* Contributors: CLEMENCE LEBRUN
* IBM - Initial Contribution
********************************************************************************/
require( 'dotenv' ).config( {silent: true} );

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

var https = require('https');
var db;
var cloudant;

var fileToUpload;

var dbCredentials = {
    dbName : 'optimz'
};

var Watson = require( 'watson-developer-cloud' ); // watson sdk
// The following requires are needed for logging purposes
var uuid = require( 'uuid' );
var vcapServices = require( 'vcap_services' );
var basicAuth = require( 'basic-auth-connect' );




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
//var weather_host = appEnv.services["weatherinsights"]
//? appEnv.services["weatherinsights"][0].credentials.url // Insights for Weather credentials passed in
// or copy your credentials url here for standalone
var cloudant_host = "<cloudant_credentials>";
var weather_host =  "<weather_credentials>"; 

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
    var geocode = (req.query.geocode || "34.53,84.50").split(",");
    weatherAPI("/api/weather/v1/geocode/" + geocode[0] + "/" + geocode[1] + "/forecast/daily/10day.json", {
        units: req.query.units || "m",
        language: req.query.language || "en"
    }, function(err, result) {
        if (err) {
            console.log(err);
            res.send(err).status(400);
        } else {
            console.log("10 days Forecast");
            res.json(result);
        }
    });
});

/*app.get('/api/forecast/daily', function(req, res) {
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
});*/

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
function getDB(path,qs, done) {
    var url = cloudant_host + path +"/"+qs.deviceId;
    console.log(url, qs);
    request({
        url: url,
        method: "GET",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            "Accept": "application/json"
        },
        
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
app.get('/predict', function(req, res) {
    getDB("/optim",{deviceId: req.query.deviceId},function(err, result) {
        if (err) {
            res.send(err).status(400);
        } else {
            res.json(result);
        }
    });
});
app.get('/status', function(req, res) {
    getDB("/phcstatus",{deviceId: req.query.deviceId},function(err, result) {
        if (err) {
            res.send(err).status(400);
        } else {
            res.json(result);
            console.log(result);
        }
    });
});
function postCommand(qs, done) {
    var orgId = qs.orgId;
    var deviceType = qs.deviceType;
    var deviceID = qs.deviceId;
    var cmdType = qs.cmdType;
    var duty = parseInt(qs.duty);
    var auth = qs.apiKey+":"+qs.apiToken+"@";
    var url = "https://"+auth+orgId+".messaging.internetofthings.ibmcloud.com/api/v0002/application/types/"+deviceType+"/devices/"+deviceID+"/commands/"+cmdType;

    request({
        url: url,
        method: "POST",
        json: true,
        body: { "PWMFreqDiv": 0,"PWMMode": 1, "PWMDuty": duty }
        
    }, function(err, req, data) {
        if (err) {
            done(err);
        } else {
            if (req.statusCode >= 200 && req.statusCode < 400) {
                try {
                    done(null, data);
                } catch(e) {
                    console.log("err " +e);
                    done(e);
                    
                }
            } else {
                console.log(err);
                done({ message: req.statusCode, data: data });
            }
        }
    });
}
function postBlink(qs, done) {
    var orgId = qs.orgId;
    var deviceType = qs.deviceType;
    var deviceID = qs.deviceId;
    var cmdType = qs.cmdType;
    var duty = parseInt(qs.duty);
    var auth = qs.apiKey+":"+qs.apiToken+"@";
    var url = "https://"+auth+orgId+".messaging.internetofthings.ibmcloud.com/api/v0002/application/types/"+deviceType+"/devices/"+deviceID+"/commands/"+cmdType;

    request({
        url: url,
        method: "POST",
        json: true,
        body: { "PWMFreqDiv": 5,"PWMMode": 1, "PWMDuty": duty }
        
    }, function(err, req, data) {
        if (err) {
            done(err);
        } else {
            if (req.statusCode >= 200 && req.statusCode < 400) {
                try {
                    done(null, data);
                } catch(e) {
                    console.log("err " +e);
                    done(e);
                    
                }
            } else {
                console.log(err);
                done({ message: req.statusCode, data: data });
            }
        }
    });
}
app.get('/cmdLight', function(req, res) {
    postCommand({orgId: req.query.orgId, deviceType: req.query.deviceType, deviceId: req.query.deviceId, duty: req.query.duty, apiKey: req.query.apiKey, apiToken: req.query.apiToken, cmdType: "pwm"},function(err, result, data) {
        if (err) {
             console.log(err);
            //res.send(err).status(400);
        } else {
            //res.send(result);
            console.log("successful command");
            res.send("successful command");
        }
    });
});
app.get('/cmdBlink', function(req, res) {
    postBlink({orgId: req.query.orgId, deviceType: req.query.deviceType, deviceId: req.query.deviceId, duty: req.query.duty, apiKey: req.query.apiKey, apiToken: req.query.apiToken, cmdType: "pwm"},function(err, result, data) {
        if (err) {
             console.log(err);
            //res.send(err).status(400);
        } else {
            //res.send(result);
            console.log("successful command");
            res.send("successful command");
        }
    });
});

// Create the service wrapper
var conversation = new Watson.conversation( {
  username: '',
  password: '',
  version: 'v1',
  version_date: '2016-09-20'
} );

// Endpoint to be call from the client side
app.post( '/WatsonApi/message', function(req, res) {
  var workspace = ''; 
  if ( !workspace || workspace === '<workspace-id>' ) {
    return res.json( {
      'output': {
        'text': 'The app has not been configured with a <b>WORKSPACE_ID</b> environment variable. Please refer to the ' +
        '<a href="https://github.com/watson-developer-cloud/conversation-simple">README</a> documentation on how to set this variable. <br>' +
        'Once a workspace has been defined the intents may be imported from ' +
        '<a href="https://github.com/watson-developer-cloud/conversation-simple/blob/master/training/car_workspace.json">here</a> in order to get a working application.'
      }
    } );
  }
  var payload = {
    workspace_id: workspace,
    context: {},
    input: {}
  };
  if ( req.body ) {

    if ( req.body.input ) {
      payload.input = req.body.input;
    }
    if ( req.body.context ) {
      // The client must maintain context/state
      payload.context = req.body.context;
    }
  }

  // Send the input to the conversation service
  conversation.message( payload, function(err, data) {
    if ( err ) {
        console.log(err);
      return res.status( err.code || 500 ).json( err );
    }
    return res.json( updateMessage( payload, data ) );
  } );

} );

/**
 * Updates the response text using the intent confidence
 * @param  {Object} input The request to the Conversation service
 * @param  {Object} response The response from the Conversation service
 * @return {Object}          The response with the updated message
 */
function updateMessage(input, response) {
  var responseText = null;
  var id = null;
  if ( !response.output ) {
    response.output = {};
  } else {
    return response;
  }
  if ( response.intents && response.intents[0] ) {
    var intent = response.intents[0];
    // Depending on the confidence of the response the app can return different messages.
    // The confidence will vary depending on how well the system is trained. The service will always try to assign
    // a class/intent to the input. If the confidence is low, then it suggests the service is unsure of the
    // user's intent . In these cases it is usually best to return a disambiguation message
    // ('I did not understand your intent, please rephrase your question', etc..)
    if ( intent.confidence >= 0.75 ) {
      responseText = 'I understood your intent was ' + intent.intent;
    } else if ( intent.confidence >= 0.5 ) {
      responseText = 'I think your intent was ' + intent.intent;
    } else {
      responseText = 'I did not understand your intent';
    }
  }
  response.output.text = responseText;

  return response;
}

app.use('/',index);

app.use(function(req, res, next) {
    if(req.session.api_key){

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
