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


//load the state : simulation day or simulation night or real time data
function loadData() {
	var state = localStorage.getItem('_simulstate');
	if (!state) return false;
   //localStorage.removeItem('_simulstate');
   	//parses to Object the JSON string
   state = JSON.parse(state);
	//do what you need with the Object
   console.log(state);
   simulstate = state;
   
   return true;
}
function onDeviceChanged(){
	selectedDevice =$("#deviceslist").val();
	if(selectedDevice != ""){
		$("[name='realtime-switch']").bootstrapSwitch('toggleDisabled',false,true);
	}else{
		$("[name='realtime-switch']").bootstrapSwitch('toggleDisabled',true,true);
	}
	console.log(selectedDevice);
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
		if(xhr.status === 401 || xhr.status === 403 || xhr.status === 500){
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
		size = devices.length;
		console.log(data);
		for(var d in devices){
			$("#deviceslist").append("<option value="+devices[d].clientId+">"+devices[d].deviceId+"</option>");
		}
		
	},
	error: function (xhr, ajaxOptions, thrownError) {
		console.log(xhr.status);
		console.log(thrownError);
	}
});

loadData();
realtime = new Realtime(orgId, api_key, auth_token, simulstate, selectedDevice);


