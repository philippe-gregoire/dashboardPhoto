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

var initMap = function(){
  
  var myLatLngCenter = {lat: 41.121054, lng: -30.763709};
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
  var contentStringM = '<div id="content"><h4 id="firstHeading" class="firstHeading">Malaga Connected Lamp</h4><div id="street"></div></br><div id="bodyContent"><p><b>Description: </b>Cognitive Street Light</p><p><b>Manufacturer: </b>None</p><p><b>Mode: </b>Simulation</p><p><button  class="btn btn-primary btn-md" onclick="storeInfos(' + null+ ', ' + null + ')">DASHBOARD</button></p></div></div>';

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

  var contentStringB = '<div id="content"><h4 id="firstHeading" class="firstHeading">Dublin Connected Lamp</h4><div id="street"></div></br><div id="bodyContent"><p><b>Description: </b>Cognitive Street Light</p><p><b>Manufacturer: </b>None</p><p><b>Mode: </b>Simulation</p><p><button  class="btn btn-primary btn-md" onclick="storeInfos(' + null+ ', ' + null + ')">DASHBOARD</button></p></div></div>';

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
  var contentStringMB = '<div id="content"><h4 id="firstHeading" class="firstHeading">New-York Connected Lamp</h4><div id="street"></div></br><div id="bodyContent"><p><b>Description: </b>Cognitive Street Light</p><p><b>Manufacturer: </b>None</p><p><b>Mode: </b>Simulation</p><p><button  class="btn btn-primary btn-md" onclick="storeInfos(' + null+ ', ' + null + ')">DASHBOARD</button></p></div></div>';

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

  var contentStringS = '<div id="content"><h4 id="firstHeading" class="firstHeading">Moscow Connected Lamp</h4><div id="street"></div></br><div id="bodyContent"><p><b>Description: </b>Cognitive Street Light</p><p><b>Manufacturer: </b>None</p><p><b>Mode: </b>Simulation</p><p><button  class="btn btn-primary btn-md" onclick="storeInfos(' + null+ ', ' + null + ')">DASHBOARD</button></p></div></div>';

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

function storeInfos(id, state){
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

  } else {
      window.alert("Browser does not support this app version");
  }

  window.location = 'home.html';
}
