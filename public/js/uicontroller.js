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
var deviceId = "";
//flag for historian
var isHistorian = false;
var api_key ="";
var auth_token = "";
var devices = [];
var opt = [];
var realtime;
var simulstate ="realtime";

var selectedDevice="";
var photocontrollerList = [];

//load the state : simulation day or simulation night or real time data
function loadData() {
	var state = localStorage.getItem('_simulstate');
	if (!state) return false;
   //localStorage.removeItem('_simulstate');
   	//parses to Object the JSON string
   //state = JSON.parse(state);
	//do what you need with the Object
   console.log(state);
   simulstate = state;
   
   return true;
}




// Get the OrgId and OrgName
$.ajax
({
	type: "GET",
	url: "/api/v0002/organization",
	dataType: 'json',
	async: false,

	success: function (data, status, jq){
		//loadData();
		orgId = data.id;
		orgName = data.name;
		api_key = data.api_key;
		auth_token = data.auth_token;
		if(document.getElementById('apikeyDisplay') != null){
			document.getElementById('apikeyDisplay').innerHTML = api_key;
		}
		if(document.getElementById('orgDisplay') != null){
			document.getElementById('orgDisplay').innerHTML = orgId;
		}

	},
	error: function (xhr, ajaxOptions, thrownError) {
		if(xhr.status === 401 || xhr.status === 403){
			console.log("Not authorized. Check your Api Key and Auth token");
			window.location.href="loginfail";
		}
		console.log("Not able to fetch the Organization details");
		console.log(xhr.status);
		console.log(thrownError);
	}
	
});


//get the devices list of the org
$.ajax
({
	type: "GET",
	url: "/api/v0002/organization/getdevices",
	dataType: 'json',
	async: true,

	success: function (data, status, jq){

		devices = data;
		for(var d in devices){
			if(devices[d].metadata != null){
				photocontrollerList.push(devices[d])
				if((devices[d].metadata.lat != null) && (devices[d].metadata.lon != null)){
					addDynamicMArker(devices[d]);
				}
			}
		}
		
		
		
	},
	error: function (xhr, ajaxOptions, thrownError) {
		console.log(xhr.status);
		console.log(thrownError);
	}
});

loadData();

function storeInfos(id, state, lat,lon, name){
	deviceId = id;

	if(state == null){
		state = localStorage.getItem("_simulstate");
	}
	simulstate = state;
	
	// Check browser support
	if (typeof(Storage) !== "undefined") {
	    // Store
	    localStorage.setItem("api_key", api_key);
	    localStorage.setItem("auth_token", auth_token);
	    localStorage.setItem("simulstate", simulstate);
	    localStorage.setItem("deviceId", deviceId);
	    localStorage.setItem("location_lat", lat);
	    localStorage.setItem("location_lon", lon);
	    localStorage.setItem("name", name);


	} else {
	    window.alert("Browser does not support this app version");
	}

	window.location = 'home.html';
}



