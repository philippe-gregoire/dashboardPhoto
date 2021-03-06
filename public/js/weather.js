/*******************************************************************************
* Copyright (c) 2016 IBM Corporation and other Contributors.
*
* All rights reserved. 
*
* Contributors: CLEMENCE LEBRUN
* IBM - Initial Contribution
*******************************************************************************/

//-- display json in tables

var cellColors = [ "689fd5", "87b2dd", "a3c4e5", "c7ddf3", "e1edfb" ];

function getCellColor(depth) {
	return cellColors[Math.min(depth, cellColors.length - 1)];
}

function renderArray(arr, depth) {
	depth = depth || 0;
	var s = "";
	if (arr.length) {
		s += '<div class="cde_array">'

		for (var i = 0; i < arr.length; i++) {
			s += '<div class="cde_item">';
			if (typeof arr[i] == "object") {
				if (arr[i] instanceof Array) {
					s += renderArray(arr[i], depth + 1);
				} else {
					s += renderObject(arr[i], depth + 1);
				}
			} else {
				s += '<span style="padding:3px;">' + arr[i] + '</span>';
			}
			s += '</div>';
		}
		s += '</div>';
	}
	return s;
}

function renderObject(obj, depth) {
	depth = depth || 0; 
	var s = "";
	s += '<div class="cde_object">'
	+		'<table cellpadding="0" cellspacing="0px" width="100%">'
	for (var n in obj) {
		s +=	'<tr>'
		+	 		'<td  align="left" valign="top" class="cde_cell_property"'
		+					' bgcolor="#' + getCellColor(depth) + '" style="border:1px solid #cccccc;">' 
		+ 				'<span style="padding:5px; color:' + (depth == 0 ? '#FFFFFF' : '#000000') + '" style="border:1px solid silver;">'
		+					n
		+				'</span>'
		+ 			'</td>'
		+			'<td align="left" valign="top" width="100%" class="cde_cell_value" bgcolor="#' + getCellColor(depth) + '"' 
		+				(typeof obj[n] != "object" ? ' style="border:1px solid #cccccc;"' : '') + '>';

		if (n == "image") {
			s += '<img src="' + obj[n] + '"/>'
		} else if (typeof obj[n] == "object") {
			if (obj[n] instanceof Array) {
				s += renderArray(obj[n], depth + 1);
			} else {
				s += renderObject(obj[n], depth + 1);
			}
		} else {
			s += '<span style="padding:5px;">' + obj[n] + '</span>';
		}

		s += 		'</td>'
		+		'</tr>';
	}
	s +=	'</table>'
	+	'</div>';
	return s;
}

//-- daily display

function getIconURL(code) {
	return "./images/weathericons/icon" + code + ".png";
}

function getDow(d) {
    var weekNames = [ "Sunday", "Monday", "Tuesday", "Wednedsay", "Thursday", "Friday", "Saturday" ];
    return weekNames[d.getDay()]; 
}

function getMonthDate(d) {
   	var monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
    return monthNames[d.getMonth()] + ' ' + d.getDate();
}

function parseDate(d) {
    var weekNames = [ "Sunday", "Monday", "Tuesday", "Wednedsay", "Thursday", "Friday", "Saturday" ],
    	monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ],
        d2 = weekNames[d.getDay()] + ', ' 
        + 	monthNames[d.getMonth()] + ' ' 
        +  	d.getDate() + ', ' 
        +	d.getFullYear() + ' @ ' 
        +	d.getHours() + ':' 
        + 	pad(d.getMinutes(), 2)
    return d2;
}

function getTime(iso) {
	if (iso) {
		return iso.substring(11, 16);
	} else {
		return "unknown";
	}
}

function speedType() {
	//var units = $("#weather_units").val();
	var units = "e"
	if (units == 'm' || units == 'h') {
		return "KPH";
	} else {
		return "MPH";
	}
}

function tempType() {
	//var units = $("#weather_units").val();
	var units = "e"
	if (units == 'm' || units == 'h') {
		return "C";
	} else {
		return "F";
	}
}

function updateToday(forecast) {
	var d = new Date(forecast.fcst_valid_local) || Date.now();
	var dateString =  getMonthDate(d) + ", " + d.getFullYear();
	var data = forecast.day || forecast.night;

	$("#weather_icon").html('<img id="weather_icon" hspace="10px" width="70px" height="70px" src="' + getIconURL(data.icon_code) + '"/>');
	$("#weather_dow").html(forecast.dow);
	$("#weather_date").html(dateString);
	$("#weather_temp").html(data.temp + '&#176;' + tempType());
	$("#weather_desc").html(data.phrase_32char);
	$("#weather_wind").html(data.wdir_cardinal + ' ' + data.wspd + ' ' + speedType());
	$("#weather_humidity").html(data.rh + '%');
	$("#weather_uv").html(data.uv_index + ' out of 10');
	$("#weather_sunrise").html(getTime(forecast.sunrise));
	$("#weather_sunset").html(getTime(forecast.sunset));
	$("#weather_moonrise").html(getTime(forecast.moonrise));
	$("#weather_moonset").html(getTime(forecast.moonset));

	$("#weather_display").css('display', 'block');
}

function resetToday() {
	$("#weather_display").css('display', 'none');
}


//-- vertical layout
function renderForecastDay1(forecast, index) {
	var icon = (forecast.day || forecast.night).icon_code;
	document.getElementById('weather_day1').innerHTML = forecast.dow;
	document.getElementById('weather_icon1').src = getIconURL(icon);
	document.getElementById('weather_temp1').innerHTML = forecast.max_temp + " / " +forecast.min_temp + " °F";
	document.getElementById('weather_desc1').innerHTML = forecast.narrative ;
	
}

//-- vertical layout
function renderForecastDay2(forecast, index) {
	var icon = (forecast.day || forecast.night).icon_code;
	
	document.getElementById('weather_day2').innerHTML = forecast.dow;
	document.getElementById('weather_icon2').src = getIconURL(icon);
	document.getElementById('weather_temp2').innerHTML = forecast.max_temp + " / " +forecast.min_temp + " °F";
	document.getElementById('weather_desc2').innerHTML = forecast.narrative ;
}

//-- vertical layout
function renderForecastDay3(forecast, index) {
	var icon = (forecast.day || forecast.night).icon_code;
	document.getElementById('weather_day3').innerHTML = forecast.dow;
	document.getElementById('weather_icon3').src = getIconURL(icon);
	document.getElementById('weather_temp3').innerHTML = forecast.max_temp + " / " +forecast.min_temp + " °F";
	document.getElementById('weather_desc3').innerHTML = forecast.narrative ;
}
var dailyForecasts = [];	// current data

function renderDailyForecast1(forecasts) {
	
	forecasts.forEach(function(forecast, index) {
		if(index == 0){
			renderForecastDay1(forecast, index);
			return;
		}
		
	});

}
function renderDailyForecast2(forecasts) {
	forecasts.forEach(function(forecast, index) {
		if(index == 1){
			renderForecastDay2(forecast, index);	
		}
		
	});

}
function renderDailyForecast3(forecasts) {
	forecasts.forEach(function(forecast, index) {
		if(index == 2){
			renderForecastDay3(forecast, index);

		}
		
	});

}

function displayDaily(result) {
	if (result.forecasts) {
		dailyForecasts = result.forecasts.slice(1);

		renderDailyForecast1(result.forecasts.slice(1));
		renderDailyForecast2(result.forecasts.slice(1));
		renderDailyForecast3(result.forecasts.slice(1));

	}
}


// daily events

var dailyVisible = [];	// undefined == create, true == visible, false == hidden

function dailyReset() {
	dailyForecasts = [];
	dailyVisible = [];
	$("#weather_daily").html("");
	$("#weather_hourly_json").html("");
	$("#daily_throbber").css('display', 'block');
}

function renderDayJson(index) {
	var s = renderObject({ daily_forecast: dailyForecasts[index] });
	return s;
}

function showDayJson(index) {
	if (dailyVisible[index] === undefined) {
		$("#dailyforecast_json_" + index).html(renderDayJson(index));
		dailyVisible[index] = false;
	}
	$("#dailyforecast_json_" + index).show("slow");
	dailyVisible[index] = true;
}

function hideDayJson(index) {
	if (dailyVisible[index]) {
		$("#dailyforecast_json_" + index).hide("slow");
		dailyVisible[index] = false;
	}
}

function clickDay(index) {
	// if div is visible
	if (dailyVisible[index]) {
		hideDayJson(index);
	} else {
		showDayJson(index);
	}
}

function overDay(ele) {
	ele.style.backgroundColor = "#3B4B54";
}

function outDay(ele) {
	ele.style.backgroundColor = "#000000";
}


//-- hourly display

var hourlyForecasts = [];	// current data

function renderHour(forecast, index) {
	var hour = forecast.fcst_valid_local.substring(11, 13);
	var s = 
		'<table id="hourCell_' + index + '" cellspacing="0px" width="28px" height="80px" style="border:1px solid transparent; margin:0 auto; background-color:black; color:white; user-select:none; -moz-user-select:-moz-none; cursor:pointer"'
	+		' onmouseover="overHour(this);" onmouseout="outHour(this);"; onclick="clickHour(' + index + ');">'
	+		'<tr>'
	+		 	'<td valign="top" align="center">'
	+				'<span style="font-size:11pt;">' + hour + '</span>'
	+			'</td>'
	+		'</tr>'
	+		'<tr>'
	+			'<td valign="top" align="left" height="30px" width="30px">'
	+ 				'<img vspace="3px" hspace="3px" width="22px" height="22px" src="' + getIconURL(forecast.icon_code) + '"/>'
	+			'</td>'
	+	 	'</tr>'
	+		'<tr>'
	+			'<td valign="top" align="center">'
	+				'<span style="font-size:8pt;">' + forecast.temp + '&#176;</span>'
	+			'</td>'
	+	 	'</tr>'

	+	'</table>';
	return s;
}

function renderHourly(result) {
	var s = 
		'<table cellspacing="0px" style="margin:0 auto;">';
	+		'<tr>';
	result.forecasts.forEach(function(forecast, index) {
		s += 	'<td valign="top" align="center" width="30px">'
		+			renderHour(forecast, index)
		+		'</td>';
	});
	s += 	'</tr>'
	+	'</table>';
	return s;
}

function displayHourly(result) {
	hourlyForecasts = result.forecasts;
	$("#weather_hourly").html(renderHourly(result));
}

// hourly events

var hourIndex = -1;	// currently displayed hour json
var hourDivs = [];	// json table div elements

function hourlyReset() {
	hourIndex = -1;
	hourDivs = [];
	$("#weather_hourly").html("");
	$("#weather_hourly_json").html("");
}

function renderHourJson(index) {
	var s = 
		'<div id="hourlyforecast_' + index + '" style="width:800px; padding:5px; display:none;">'
	+		renderObject({ hourly_forecast: hourlyForecasts[index] })
	+	'</div>';
	return s;
}

function showHourJson(index) {
	if (!hourDivs[index]) {
		document.getElementById("weather_hourly_json").insertAdjacentHTML('beforeend', renderHourJson(index));
		hourDivs[index] = document.getElementById("hourlyforecast_" + index);
	}
	$(hourDivs[index]).show("slow");
	document.getElementById("hourCell_" + index).style.border = "1px solid white";
	hourIndex = index;
}

function hideHourJson(index) {
	if (index > -1) {
		$(hourDivs[index]).hide("slow");
		$("#hourCell_" + index).css("border", "1px solid transparent");
		hourIndex = -1;
	}
}

function clickHour(index) {
	if (index != hourIndex) {
		hideHourJson(hourIndex);
		showHourJson(index);
	} else {
		hideHourJson(hourIndex);
	}
}

function overHour(ele) {
	ele.style.backgroundColor = "#3B4B54";
}

function outHour(ele) {
	ele.style.backgroundColor = "#000000";
}


//-- event handlers

//var defaultGeo = "45.43,-75.68"; // Ottawaw
var lat = localStorage.getItem("location_lat");
var lon = localStorage.getItem("location_lon");
//var lon = localStorage.getItem("coor").lon;
var defaultGeo = lat+','+lon;//"36.1215,-115.1739"; //vegas


function addGeocode(label, geocode) {
	var x = document.getElementById("weather_presets");
	var option = document.createElement("option");
	option.text = label;
	option.value = geocode;
	x.add(option, 0);
}

function setCoordinates() {
	// get coordinate
	var latitude = $("#weather_latitude").val();
	var longitude = $("#weather_longitude").val();
	console.log("setCoordinates: %s,%s", latitude, longitude );
}

function getCoordinates() {
	return document.getElementById("weather_presets").value;
}

function getUnits() {
	return $("#weather_units").val();
}

function getLanguage() {
	return $("#weather_language").val();
}

function setUnits() {
	setLocation();
}

function setLanguage(language) {
	setLocation();
}

function updatePresets(geocode) {
	var index = 0;
	var sel = document.getElementById("weather_presets");
	for(var i = 1; i < sel.options.length; i++) {
		if (sel.options[i].value == geocode) {
			index = i;
			break;
		}
	}
	sel.selectedIndex = index;
}

function updateControls(geocode, units, language) {
	if (geocode) {
		var a = geocode.split(",");
		$("#weather_latitude").val(a[0]);
		$("#weather_longitude").val(a[1]);
		document.getElementById("weather_presets").value = geocode;
	}
	if (units) {
		document.getElementById("weather_units").value = units;
	}
	if (language) {
		document.getElementById("weather_language").value = language;
	}
}


//-- global

function displayReset() {

	dailyReset();
}



//-- browser geolocation

// callback - done(err, latitude, longitude)
function getLocation(done) {
    var x = document.getElementById("mapholder");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
       	    var latitude = position.coords.latitude;
       	    var longitude = position.coords.longitude;
       	    done(null, latitude.toFixed(2) + ',' + longitude.toFixed(2));
        }, function(err) {
		    switch(err.code) {
		        case err.PERMISSION_DENIED:
		            done("User denied the request for Geolocation.");
		            break;
		        case err.POSITION_UNAVAILABLE:
		            done("Location information is unavailable.");
		            break;
		        case err.TIMEOUT:
		            done("The request to get user location timed out.");
		            break;
		        case err.UNKNOWN_ERROR:
		            done("An unknown error occurred.");
		            break;
		    }
        });
    } else {
        done("Geolocation is not supported by this browser.");
    }
}

// callback - done(err, result)
function weatherAPI(path, qs, done) {
   	$.ajax({
		url: path,
		type: 'GET',
		contentType:'application/json',
		data: qs,
  		success: function(data) {
  			if (data.message == 401) {
  				try {
  					data.data = JSON.parse(data.data);
  				} catch(e) {
  				}
				done(data);
  			} else {
  				done(null, data);
  			}
		},
		error: function(xhr, textStatus, thrownError) {
			done(textStatus);
		}
	});
}

function renderError(err) {
	console.log(err)
	var s = "";
	if (err.message 
		&& err.data.errors
		&& err.data.errors[0]
		&& err.data.errors[0].error) {
		s += err.message 
		+ 	" - " + err.data.errors[0].error.code 
		+ 	": " + err.data.errors[0].error.message;
	} else {
		s += "Error: " + err;
	}
	console.log(s);
	return s;
}

function showWaiting(throbberdiv, errordiv, displaydiv) {
	$(throbberdiv).css('display', 'block');
	$(displaydiv).css('display', 'none');
	$(errordiv).css('display', 'none');
}

function showError(throbberdiv, errordiv, displaydiv, err) {
	$(throbberdiv).css('display', 'none');
	$(displaydiv).css('display', 'none');
	$(errordiv).css('display', 'block');
	$(errordiv).html('<span style=" vertical-align: middle;">' + renderError(err) + '</span>');
}

function showDisplay(throbberdiv, errordiv, displaydiv) {
	$(throbberdiv).css('display', 'none');
	$(errordiv).css('display', 'none');
	$(displaydiv).css('display', 'block');
}

function setLocation(geocode, units, language) {
	geocode = geocode || getCoordinates();
	units = units || getUnits();
	language = language || getLanguage();

	displayReset();
	
	
	weatherAPI("/api/forecast/daily", { 
		geocode: geocode,
		units: units,
		language: language
	}, function(err, data) {
  		if (err) {
  			showError('#daily_throbber', '#daily_error', '#daily_display', err);
  		} else {
  			if (data.forecasts) {
	  			
				displayDaily(data);
			} else {
	  			showError('#daily_throbber', '#daily_error', '#daily_display', "Data missing");
	  		}
  		}
	});

	
}

function init() {
	
	var geocode = defaultGeo;
	
	setLocation(geocode, "e", "en");
}


