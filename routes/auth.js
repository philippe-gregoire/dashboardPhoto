/*--*******************************************************************************
* Copyright (c) 2016 IBM Corporation and other Contributors.
*
* All rights reserved. 
*
* Contributors: CLEMENCE LEBRUN
* IBM - Initial Contribution
********************************************************************************/

var express = require('express');
var router = express.Router();

console.log("in auth ");

router.post('/login', function(req, res) {
  
  console.log("Logged in using api key : "+req.body.api_key);

  req.session.api_key = req.body.api_key;
  req.session.auth_token = req.body.auth_token;
  res.redirect("/dashboard");
  
});
router.get('/login', function(req, res) {
  res.render('index.html');
});
//login page after a login failure
router.get('/loginfail', function(req, res) {
  res.render('loginfail.html');
});

router.post('/logout', function(req, res) {
  console.log('logout');
  req.session.destroy();

  res.redirect('/login');
});

router.get('/logout', function(req, res) {
  req.session.destroy();

  res.redirect('/login');
});

module.exports = router;