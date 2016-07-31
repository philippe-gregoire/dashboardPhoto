/*******************************************************************************
* Copyright (c) 2016 IBM Corporation and other Contributors.
*
* All rights reserved. 
*
* Contributors: CLEMENCE LEBRUN
* IBM - Initial Contribution
*******************************************************************************/



var orgId = "";
var orgName = "";

var isHistorian = false;
var api_key ="";
var auth_token = "";

var devices = [];
var realtime;
var simulstate ="realtime";

$("[name='realtime-switch']").bootstrapSwitch('toggleDisabled',true,true);


function validateForm() {
    api_key = document.forms["loginForm"]["api_key"].value;
    auth_token = document.forms["loginForm"]["auth_token"].value;
    
    if (api_key == null || api_key == "" || auth_token == null || auth_token == ""  ) {
        $( "#emptyLog" ).removeClass( "notVisible" );
        $( "#emptyLog" ).addClass( "setVisible" );
        return false;
    }
  }

