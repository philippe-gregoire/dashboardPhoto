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


router.get('/', function(req, res) {

	res.render('dashboard.html');
});


module.exports = router;