/*******************************************************************************
* Copyright (c) 2016 IBM Corporation and other Contributors.
*
* All rights reserved. 
*
* Contributors: CLEMENCE LEBRUN
* IBM - Initial Contribution
*******************************************************************************/
var markerMirage;
var markerBellagio;
var markerHarley;
var markerSign;
var markerMandalay;
var imageLightOn;
var imageLightOff;
var simulstate ="realtime";

var initMap = function(){
  
  var myLatLngCenter = {lat: 36.100774, lng: -115.173149};
  var myLatLngMirage = {lat: 36.121410, lng: -115.172102};
  var myLatLngBellagio = {lat: 36.112566, lng: -115.173068};
  var myLatLngMandalay = {lat: 36.0906428, lng: -115.1812648};
  var myLatLngSign = {lat: 36.081750, lng: -115.172532};
  var myLatLngHarley = {lat: 36.107802, lng: -115.172729};

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

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: myLatLngCenter
  });


  // mirage
  markerMirage = new google.maps.Marker({
    position: myLatLngMirage,
    icon: imageLightOn,
    map: map,
    title: 'Mirage Connected Lamp'
  });
  var contentStringM = '<div id="content"><h4 id="firstHeading" class="firstHeading">Mirage Connected Lamp</h4><div id="street"></div></br><div id="bodyContent"><p><b>Lamp type: </b>LED</p><p><b>Solar panel: </b>8 W</p></div></div>';

  var infoWindowM = new google.maps.InfoWindow({
      content: contentStringM
  });
  markerMirage.addListener('click', function() {
    infoWindowM.open(map, markerMirage);
    var pano = null;
    google.maps.event.addListener(infoWindowM, 'domready', function () {
    
      pano = new google.maps.StreetViewPanorama(document.getElementById("street"), {
        position: myLatLngMirage,
        zoomControl: false,
        enableCloseButton: false,
        addressControl: false,
        panControl: false,
        linksControl: false
      });
    });
  });

  // Bellagio
  markerBellagio = new google.maps.Marker({
    position: myLatLngBellagio,
    icon: imageLightOn,
    map: map,
    title: 'Bellagio Connected Lamp'
  });

  var contentStringB = '<div id="content"><h4 id="firstHeading" class="firstHeading">Bellagio Connected Lamp</h4><div id="street"></div></br><div id="bodyContent"><p><b>Lamp type: </b>LED</p><p><b>Solar panel: </b>8 W</p></div></div>';

  var infoWindowB = new google.maps.InfoWindow({
      content: contentStringB
  });
  markerBellagio.addListener('click', function() {
    infoWindowB.open(map, markerBellagio);
    var pano = null;
    google.maps.event.addListener(infoWindowB, 'domready', function () {
    
      pano = new google.maps.StreetViewPanorama(document.getElementById("street"), {
        position: myLatLngBellagio,
        zoomControl: false,
        enableCloseButton: false,
        addressControl: false,
        panControl: false,
        linksControl: false
      });
    });
  });

  // Mandalay
  markerMandalay = new google.maps.Marker({
    position: myLatLngMandalay,
    icon: imageLightOn,
    map: map,
    title: 'Mandalay bay EXPO Connected Lamp'
  });
  var contentStringMB = '<div id="content"><h4 id="firstHeading" class="firstHeading">Mandalay Connected Lamp</h4><div id="street"></div></br><div id="bodyContent"><p><b>Lamp type: </b>LED</p><p><b>Solar panel: </b>8 W</p><p><a href="homeSimul.html">DETAILS</a></p></div></div>';

  var infoWindowMB = new google.maps.InfoWindow({
      content: contentStringMB
  });
  markerMandalay.addListener('click', function() {
    infoWindowMB.open(map, markerMandalay);
    var pano = null;
    google.maps.event.addListener(infoWindowMB, 'domready', function () {
    
      pano = new google.maps.StreetViewPanorama(document.getElementById("street"), {
        position: myLatLngMandalay,
        zoomControl: false,
        enableCloseButton: false,
        addressControl: false,
        panControl: false,
        linksControl: false
      });
    });
  });

  //Sign
  markerSign = new google.maps.Marker({
    position: myLatLngSign,
    icon: imageLightOn,
    map: map,
    title: 'Sign Connected Lamp'
  });
  var contentStringS = '<div id="content"><h4 id="firstHeading" class="firstHeading">Sign Connected Lamp</h4><div id="street"></div></br><div id="bodyContent"><p><b>Lamp type: </b>LED</p><p><b>Solar panel: </b>8 W</p></div></div>';

  var infoWindowS = new google.maps.InfoWindow({
      content: contentStringS
  });
  markerSign.addListener('click', function() {
    infoWindowS.open(map, markerSign);
    var pano = null;
    google.maps.event.addListener(infoWindowS, 'domready', function () {
    
      pano = new google.maps.StreetViewPanorama(document.getElementById("street"), {
        position: myLatLngSign,
        zoomControl: false,
        enableCloseButton: false,
        addressControl: false,
        panControl: false,
        linksControl: false
      });
    });
  });

  //Harley
  markerHarley = new google.maps.Marker({
    position: myLatLngHarley,
    icon: imageLightOn,
    map: map,
    title: 'Harley-Davidson Café Connected Lamp'
  });
  var contentStringH = '<div id="content"><h4 id="firstHeading" class="firstHeading">Harley-Davidson Café Connected Lamp</h4><div id="street"></div></br><div id="bodyContent"><p><b>Lamp type: </b>LED</p><p><b>Solar panel: </b>8 W</p></div></div>';

  var infoWindowH = new google.maps.InfoWindow({
      content: contentStringH
  });
  markerHarley.addListener('click', function() {
    infoWindowH.open(map, markerHarley);
    var pano = null;
    google.maps.event.addListener(infoWindowH, 'domready', function () {
    
      pano = new google.maps.StreetViewPanorama(document.getElementById("street"), {
        position: myLatLngHarley,
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
  markerMirage.setVisible(true);
  markerBellagio.setVisible(true);
  markerMandalay.setVisible(true);
  markerSign.setVisible(true);
  markerHarley.setVisible(true);

}
setAllMarkerInVisible = function(){
  markerMirage.setVisible(false);
  markerBellagio.setVisible(false);
  markerMandalay.setVisible(false);
  markerSign.setVisible(false);
  markerHarley.setVisible(false);

}
setAllLightOn = function(){
  markerMirage.setIcon(imageLightOn);
  markerBellagio.setIcon(imageLightOn);
  markerMandalay.setIcon(imageLightOn);
  markerSign.setIcon(imageLightOn);
  markerHarley.setIcon(imageLightOn);
}
setAllLightOff = function(){
  markerMirage.setIcon(imageLightOff);
  markerBellagio.setIcon(imageLightOff);
  markerMandalay.setIcon(imageLightOff);
  markerSign.setIcon(imageLightOff);
  markerHarley.setIcon(imageLightOff);
}
if(document.getElementById("bt") != null){
  document.getElementById("bt").addEventListener("click", function(){
    window.open("images/Streelight_dashboard.mht");
  });
};


function setState(){
  //console.log($('input[name="realtime-switch"]').bootstrapSwitch('state'));
  if($('input[name="realtime-switch"]').bootstrapSwitch('state') == true){
    simulstate = "realtime";
  } else if($('input[name="day_switch"]').bootstrapSwitch('state') == true){
    simulstate = "day";
  }else if($('input[name="night_switch"]').bootstrapSwitch('state') == true){
    simulstate = "night";
  } else {
    simulstate = "nothing";
  } 
} 
function saveState() {
  if(typeof(Storage) !== "undefined") {
    // Code for localStorage/sessionStorage.
    var state = simulstate;
   //converts to JSON string the Object
   state = JSON.stringify(state);
   
   //save the encoded accout to web storage
   localStorage.setItem('_simulstate', state);
  } else {
      // Sorry! No Web Storage support..
      console.log("Sorry! No Web Storage support");
  }
  
}
//SIMULATION
//load the state : simulation day or simulation night or real time data
function loadData() {
  var state = localStorage.getItem('_simulstate');
  if (!state) return false;
   state = JSON.parse(state);

   console.log(state);
   simulstate = state;
   
   return true;
}

function simul(){
  loadData();
  var _simulstate = simulstate;
  if (_simulstate == "day"){
      if (document.getElementById('duty') != null)
        document.getElementById('duty').innerHTML = " 30%";
      if (document.getElementById('state_') != null)
        document.getElementById('state_').innerHTML = " Simulation DAY";
      if (document.getElementById('loudness') != null)
        document.getElementById('loudness').innerHTML = Math.round(100) +" %";
      if (document.getElementById('power') != null)
        document.getElementById('power').innerHTML = 8;
      if (document.getElementById('power_s') != null)
        document.getElementById('power_s').innerHTML = 8;
      if (document.getElementById('light') != null)
        document.getElementById('light').innerHTML = Math.round(100) +" %";
      if (document.getElementById('voltage_b') != null)
        document.getElementById('voltage_b').innerHTML = 50;
      //lamp turned off
      if (document.getElementById('lamp') != null){
        document.getElementById('lamp').innerHTML = "Turned Off";
        document.getElementById('panel_light').style.backgroundColor="Gainsboro";
      } 
      if(document.getElementById('efficiency') != null){
        document.getElementById('efficiency').innerHTML = 100+" %";
      }
      if (document.getElementById('charging-img') != null)
        document.getElementById('charging-img').style.display='block';
      if (document.getElementById('discharging-img') != null)
        document.getElementById('discharging-img').style.display='none';
      if (document.getElementById('stable-img') != null)
        document.getElementById('stable-img').style.display='none';
      if (document.getElementById('intensity') != null)
        document.getElementById('intensity').innerHTML = 50;
      if (document.getElementById('voltage') != null)
        document.getElementById('voltage').innerHTML = 50;
      if (document.getElementById('power') != null)
        document.getElementById('power').innerHTML = 50;
      if (document.getElementById('motion-text') != null){
        document.getElementById('motion-text').innerHTML = "Detected presence";
        document.getElementById('motion').className = "fa fa-child fa-5x";
      }else if (document.getElementById('motion') != null){
        document.getElementById('motion').innerHTML = 1;
      }
      if(document.getElementById('state_charging') != null){
        if(document.getElementById('state_light') != null){
          document.getElementById('state_light').checked = false;
          document.getElementById('state_power').checked = false;
          document.getElementById('state_charging').checked = true;
        }
      }
      if(document.getElementById('state_low') != null){
        document.getElementById('state_low').checked = false;
        document.getElementById('state_full').checked = true;
      }
      if(document.getElementById('current_dim') != null)
        document.getElementById('current_dim').innerHTML = "100 %";
      if(document.getElementById('charge_perc') != null ) 
        document.getElementById('charge_perc').innerHTML = "95 %";
        

  } else if (_simulstate == "night"){
      if (document.getElementById('duty') != null)
        document.getElementById('duty').innerHTML = " 70%";
      if(document.getElementById('efficiency') != null){
        document.getElementById('efficiency').innerHTML = 0+" %";
      }
      if (document.getElementById('state_') != null)
        document.getElementById('state_').innerHTML = " Simulation NIGHT";
      if (document.getElementById('loudness') != null)
        document.getElementById('loudness').innerHTML = Math.round(2) +" %";
      if (document.getElementById('power') != null)
        document.getElementById('power').innerHTML = 0;
      if (document.getElementById('light') != null)
        document.getElementById('light').innerHTML = Math.round(15) +" %";
      if (document.getElementById('voltage_b') != null)
        document.getElementById('voltage_b').innerHTML = 50;
      //lamp turned off
      if (document.getElementById('lamp') != null){
        document.getElementById('lamp').innerHTML = "Turned On";
        document.getElementById('panel_light').style.backgroundColor="gold";
      }
      if (document.getElementById('charging-img') != null)
        document.getElementById('charging-img').style.display='none';
      if (document.getElementById('discharging-img') != null)
        document.getElementById('discharging-img').style.display='block';
      if (document.getElementById('stable-img') != null)
        document.getElementById('stable-img').style.display='none';
      if (document.getElementById('intensity') != null)
        document.getElementById('intensity').innerHTML = 0;
      if (document.getElementById('voltage') != null)
        document.getElementById('voltage').innerHTML = 5;
      if (document.getElementById('voltage_b') != null)
        document.getElementById('voltage_b').innerHTML = 5;
      if (document.getElementById('power_s') != null)
        document.getElementById('power_s').innerHTML = 0;
      if (document.getElementById('motion-text') != null){
        document.getElementById('motion-text').innerHTML = "No detected presence";
        document.getElementById('motion').className = "fa fa-male fa-5x";
      }else if (document.getElementById('motion') != null){
        document.getElementById('motion').innerHTML = 0;
      }
      if(document.getElementById('state_charging') != null){
        if(document.getElementById('state_light') != null){
          document.getElementById('state_light').checked = true;
          document.getElementById('state_power').checked = true;
          document.getElementById('state_charging').checked = false;
        }
      } 
      if(document.getElementById('state_low') != null){
        document.getElementById('state_low').checked = true;
        document.getElementById('state_full').checked = false;
      }
      if(document.getElementById('current_dim') != null)
        document.getElementById('current_dim').innerHTML = "100 %";
      if(document.getElementById('charge_perc') != null ) 
        document.getElementById('charge_perc').innerHTML = "25 %";


  } else if (_simulstate == "nothing"){
      console.log("No simulation defined, no device conected");

  } else{
      console.log("Error, simulation state undifined");
    } 

}


