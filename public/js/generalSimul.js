/*******************************************************************************
* Copyright (c) 2016 IBM Corporation and other Contributors.
*
* All rights reserved. 
*
* Contributors: CLEMENCE LEBRUN
* IBM - Initial Contribution
*******************************************************************************/
var markerMalaga;
var markerDublin;
var markerNY;
var markerVegas;
var markerMoscow;

var imageLightOn;
var imageLightOff;
var simulstate =null;
var map;

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
      console.log(name);


  } else {
      window.alert("Browser does not support this app version");
  }

  window.location = 'home.html';
}

var initMap = function(){
  
  var myLatLngCenter = {lat: 44.121054, lng: -44.763709};
  var myLatLngMalaga = {lat: 36.7213, lng: -4.4214};
  var myLatLngDublin = {lat: 53.3498, lng: -6.2603};
  var myLatLngVegas = {lat: 36.0906428, lng: -115.1812648};
  var myLatLngNY = {lat: 40.7128, lng: -74.0059};
  var myLatLngMoscow = {lat: 55.7558, lng: 37.6173};

  imageLightOn = new google.maps.MarkerImage(
    'images/light.png', 
    null,
    null,
    null ,
    new google.maps.Size(25, 25)// size
  );

  imageLightOff = new google.maps.MarkerImage(
    'images/nonlight.png', 
    null,
    null,
    null,
    new google.maps.Size(25, 25) // size
  );

  imageLightRealtime = new google.maps.MarkerImage(
    'images/light_realtime.png', 
    null,
    null,
    null,
    new google.maps.Size(25, 25) // size
  );
  imageLightRealtimeConnected = new google.maps.MarkerImage(
    'images/light_realtime_connected.png', 
    null,
    null,
    null,
    new google.maps.Size(25, 25) // size
  );

  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 3,
    center: myLatLngCenter
  });


  // Malaga Simul
  markerMalaga = new google.maps.Marker({
    position: myLatLngMalaga,
    icon: imageLightOn,
    map: map,
    title: 'Malaga Connected Lamp'
  });
  var nameMalaga = 'Malaga Connected Lamp';
  var lat_malaga = myLatLngMalaga.lat;
  var lon_malaga = myLatLngMalaga.lng;
  var deviceMalaga = "d:3ru070:PhotocontrollerV2:Malaga";
  var contentStringM = '<div id="content"><h4 id="firstHeading" class="firstHeading">Malaga Connected Lamp</h4><div id="street"></div></br><div id="bodyContent"><p><b>Description: </b>Cognitive Street Light</p><p><b>Manufacturer: </b>None</p><p><b>Mode: </b>Simulation</p><p><button  class="btn btn-primary btn-md" onclick="storeInfos(\'' + deviceMalaga+ '\', ' + null +', '+'\'' + lat_malaga+ '\', \'' + lon_malaga + '\', \'' + nameMalaga + '\')">DASHBOARD</button></p></div></div>';

  var infoWindowM = new google.maps.InfoWindow({
      content: contentStringM
  });
  markerMalaga.addListener('click', function() {
    infoWindowM.open(map, markerMalaga);
    var pano = null;
    google.maps.event.addListener(infoWindowM, 'domready', function () {
    
      pano = new google.maps.StreetViewPanorama(document.getElementById("street"), {
        position: myLatLngMalaga,
        zoomControl: false,
        enableCloseButton: false,
        addressControl: false,
        panControl: false,
        linksControl: false
      });
    });
  });

  // Dublin
  markerDublin = new google.maps.Marker({
    position: myLatLngDublin,
    icon: imageLightOn,
    map: map,
    title: 'Dublin Connected Lamp'
  });
  var nameDublin = 'Dublin Connected Lamp';
  var lat_dublin = myLatLngDublin.lat;
  var lon_dublin = myLatLngDublin.lng;
  var deviceDublin = "d:3ru070:PhotocontrollerV2:Dublin";
  var contentStringB = '<div id="content"><h4 id="firstHeading" class="firstHeading">Dublin Connected Lamp</h4><div id="street"></div></br><div id="bodyContent"><p><b>Description: </b>Cognitive Street Light</p><p><b>Manufacturer: </b>None</p><p><b>Mode: </b>Simulation</p><p><button  class="btn btn-primary btn-md" onclick="storeInfos(\'' + deviceDublin+ '\', ' + null +', '+'\'' + lat_dublin+ '\', \'' + lon_dublin + '\', \'' + nameDublin + '\')">DASHBOARD</button></p></div></div>';

  var infoWindowB = new google.maps.InfoWindow({
      content: contentStringB
  });
  markerDublin.addListener('click', function() {
    infoWindowB.open(map, markerDublin);
    var pano = null;
    google.maps.event.addListener(infoWindowB, 'domready', function () {
    
      pano = new google.maps.StreetViewPanorama(document.getElementById("street"), {
        position: myLatLngDublin,
        zoomControl: false,
        enableCloseButton: false,
        addressControl: false,
        panControl: false,
        linksControl: false
      });
    });
  });

  // New-York
  markerNY = new google.maps.Marker({
    position: myLatLngNY,
    icon: imageLightOn,
    map: map,
    title: 'New-York Connected Lamp'
  });
  var nameNY = 'New-York Connected Lamp';
  var lat_ny = myLatLngNY.lat;
  var lon_ny = myLatLngNY.lng;
  var deviceNY = "d:3ru070:PhotocontrollerV2:New_York";
  var contentStringMB = '<div id="content"><h4 id="firstHeading" class="firstHeading">New York Connected Lamp</h4><div id="street"></div></br><div id="bodyContent"><p><b>Description: </b>Cognitive Street Light</p><p><b>Manufacturer: </b>None</p><p><b>Mode: </b>Simulation</p><p><button  class="btn btn-primary btn-md" onclick="storeInfos(\'' + deviceNY+ '\', ' + null +', '+'\'' + lat_ny+ '\', \'' + lon_ny + '\', \'' + nameNY + '\')">DASHBOARD</button></p></div></div>';

  var infoWindowMB = new google.maps.InfoWindow({
      content: contentStringMB
  });
  markerNY.addListener('click', function() {
    infoWindowMB.open(map, markerNY);
    var pano = null;
    google.maps.event.addListener(infoWindowMB, 'domready', function () {
    
      pano = new google.maps.StreetViewPanorama(document.getElementById("street"), {
        position: myLatLngNY,
        zoomControl: false,
        enableCloseButton: false,
        addressControl: false,
        panControl: false,
        linksControl: false
      });
    });
  });

  //Moscow
  markerMoscow = new google.maps.Marker({
    position: myLatLngMoscow,
    icon: imageLightOn,
    map: map,
    title: 'Moscow Connected Lamp'
  });
  var nameMoscow = 'Moscow Connected Lamp';
  var lat_moscow = myLatLngMoscow.lat;
  var lon_moscow = myLatLngMoscow.lng;
  var deviceMoscow = "d:3ru070:PhotocontrollerV2:Moscow";
  var contentStringS = '<div id="content"><h4 id="firstHeading" class="firstHeading">Moscow Connected Lamp</h4><div id="street"></div></br><div id="bodyContent"><p><b>Description: </b>Cognitive Street Light</p><p><b>Manufacturer: </b>None</p><p><b>Mode: </b>Simulation</p><p><button  class="btn btn-primary btn-md" onclick="storeInfos(\'' + deviceMoscow+ '\', ' + null +', '+'\'' + lat_moscow+ '\', \'' + lon_moscow + '\', \'' + nameMoscow + '\')">DASHBOARD</button></p></div></div>';

  var infoWindowS = new google.maps.InfoWindow({
      content: contentStringS
  });
  markerMoscow.addListener('click', function() {
    infoWindowS.open(map, markerMoscow);
    var pano = null;
    google.maps.event.addListener(infoWindowS, 'domready', function () {
    
      pano = new google.maps.StreetViewPanorama(document.getElementById("street"), {
        position: myLatLngMoscow,
        zoomControl: false,
        enableCloseButton: false,
        addressControl: false,
        panControl: false,
        linksControl: false
      });
    });
  });

  
  setAllMarkerInVisible();
  

}


//INIT switch
$("[name='realtime-switch']").bootstrapSwitch();
$("[name='realtime-switch']").bootstrapSwitch('toggleDisabled',true,true);
$("[name='night_switch']").bootstrapSwitch();
$("[name='day_switch']").bootstrapSwitch();



$('input[name="night_switch"]').on('switchChange.bootstrapSwitch', function(event, state) {
  if(state == true){
    setAllLightOn();
    setAllMarkerVisible();
    $('input[name="realtime-switch"]').bootstrapSwitch('state', false, true);
    $('input[name="day_switch"]').bootstrapSwitch('state', false, true);
  }else {
    setAllMarkerInVisible();
  }
  setState();
  saveState();
});
$('input[name="day_switch"]').on('switchChange.bootstrapSwitch', function(event, state) {
  if(state == true){
    setAllLightOff();
    setAllMarkerVisible();
    $('input[name="realtime-switch"]').bootstrapSwitch('state', false, true);
    $('input[name="night_switch"]').bootstrapSwitch('state', false, true);
  }else {
    setAllMarkerInVisible();
  }
  setState();
  saveState();
});
$('input[name="realtime-switch"]').on('switchChange.bootstrapSwitch', function(event, state) {
  if(state == true){
    setAllLightOff();
    setAllMarkerVisible();
    $('input[name="day_switch"]').bootstrapSwitch('state', false, true);
    $('input[name="night_switch"]').bootstrapSwitch('state', false, true);
  }else {
    setAllMarkerInVisible();
  }
  setState();
  saveState();
});

setAllMarkerVisible = function(){
  markerMalaga.setVisible(true);
  markerDublin.setVisible(true);
  markerNY.setVisible(true);
  markerMoscow.setVisible(true);

}
setAllMarkerInVisible = function(){
  markerMalaga.setVisible(false);
  markerDublin.setVisible(false);
  markerNY.setVisible(false);
  markerMoscow.setVisible(false);

}
setAllLightOn = function(){
  markerMalaga.setIcon(imageLightOn);
  markerDublin.setIcon(imageLightOn);
  markerNY.setIcon(imageLightOn);
  markerMoscow.setIcon(imageLightOn);
}
setAllLightOff = function(){
  markerMalaga.setIcon(imageLightOff);
  markerDublin.setIcon(imageLightOff);
  markerMoscow.setIcon(imageLightOff);
  markerNY.setIcon(imageLightOff);
}
if(document.getElementById("bt") != null){
  document.getElementById("bt").addEventListener("click", function(){
    window.open("images/Streelight_dashboard.mht");
  });
};


function setState(){
  
  if($('input[name="day_switch"]').bootstrapSwitch('state') == true){
    simulstate = "day";
  }else if($('input[name="night_switch"]').bootstrapSwitch('state') == true){
    simulstate = "night";
  } else {
    simulstate = null;
  } 
} 

function saveState() {
  if(typeof(Storage) !== "undefined") {
    // Code for localStorage/sessionStorage.
    var state = simulstate;

   
   //save the encoded accout to web storage
   localStorage.setItem('_simulstate', state);
  } else {
      // Sorry! No Web Storage support..
      console.log("Sorry! No Web Storage support");
  }
  
}
function addDynamicMArker(device) {
  var lat = device.metadata.lat;
  var lon = device.metadata.lon;
  var realtimeIcon = imageLightRealtime;
  var deviceId = device.clientId;
  var deviceTitle = device.deviceInfo.descriptiveLocation;
  var deviceManufacturer = device.deviceInfo.manufacturer;
  var deviceModel = device.deviceInfo.model;
  var deviceDesc = device.deviceInfo.description;
  var dynamicCoor = {lat: lat, lng: lon};
  console.log("deviceId :"+deviceId + " status: " +status);
  /*if(status == true){
    realtimeIcon = imageLightRealtimeConnected;
  } else{
    realtimeIcon = imageLightRealtime;
  }*/
  var dynamicMarker = new google.maps.Marker({
    position: dynamicCoor,
    icon: realtimeIcon,
    map: map,
    title: deviceTitle
  });
  var contentStringM = '<div id="content"><h4 id="firstHeading" class="firstHeading">'+deviceTitle+'</h4><div id="street"></div></br><div id="bodyContent"><p><b>Description: </b>'+deviceDesc+'</p><p><b>Manufacturer: </b>'+deviceManufacturer+'</p><p><b>Mode: </b>Real-time</p><p><button  class="btn btn-primary btn-md" onclick="storeInfos(\'' + deviceId + '\', \'' + "realtime" + '\', \'' + lat+ '\', \'' + lon + '\', \'' + deviceTitle + '\')">DASHBOARD</button></p></div></div>';

  var infoWindowM = new google.maps.InfoWindow({
      content: contentStringM
  });
  dynamicMarker.addListener('click', function() {
    infoWindowM.open(map, dynamicMarker);
    var pano = null;
    google.maps.event.addListener(infoWindowM, 'domready', function () {
    
      pano = new google.maps.StreetViewPanorama(document.getElementById("street"), {
        position: dynamicCoor,
        zoomControl: false,
        enableCloseButton: false,
        addressControl: false,
        panControl: false,
        linksControl: false
      });
    });
  });
}



var host = window.location.hostname;
var port = window.location.port;
var url = "unmht://"+host+".unmht:"+port+"/http.5/images/streetlight_cognos.mht/";
console.log(url);
$('a[id="viewcognos"]').attr('href',url);
