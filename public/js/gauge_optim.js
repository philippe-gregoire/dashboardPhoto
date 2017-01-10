
var orgInfos = localStorage.getItem("deviceId");
var apiKey = localStorage.getItem("api_key");
var apiToken = localStorage.getItem("auth_token");
var simulstate = localStorage.getItem("simulstate");
var tokens = orgInfos.split(':');
var org_id = tokens[1];
var device_type = tokens[2];
var device_id = tokens[3];
var inputDuty;
var slider4;

function sendCommandLight(path,qs,done) {
   $.ajax({
    url: path,
    type: 'GET',
    contentType:'application/json',
    data: qs,
      success: function(data) {
        if (data.message == 400) {
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


function validCommand(){
  var l = document.getElementById('duty').innerHTML.length;
  var valDuty =  parseInt(document.getElementById('duty').innerHTML.slice(0, l-2));
  if (simulstate == "realtime"){
    sendCommandLight("/cmdLight",{orgId: org_id, deviceType: device_type, deviceId: device_id, duty:  valDuty, apiKey: apiKey, apiToken: apiToken}, function(err, data) {
      if (err) {
        console.log("Error non valid command: "+err);
      } else {
          console.log("Ok valid command" );
      }
      console.log(data);
    });
  }
  
  inputDuty = document.getElementById('duty').innerHTML;
}

function emergency(){
  var l = document.getElementById('duty').innerHTML.length;
  var valDuty =  5;
  if (simulstate == "realtime"){
    sendCommandLight("/cmdBlink",{orgId: org_id, deviceType: device_type, deviceId: device_id, duty:  valDuty, apiKey: apiKey, apiToken: apiToken}, function(err, data) {
      if (err) {
        console.log("Error non valid command: "+err);
      } else {
          console.log("Ok valid command" );
      }
      console.log(data);
    });
  }
  
  inputDuty = document.getElementById('duty').innerHTML;
}

function getPredict(path,qs,done) {
   $.ajax({
		url: path,
		type: 'GET',
		contentType:'application/json',
		data: qs,
  		success: function(data) {
  			if (data.message == 400) {
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

if(simulstate == "realtime"){
  getPredict("/predict",{ deviceId: device_id }, function(err, data) {
  	if (err) {
  		console.log("error");
  	} else {
  		if (err) {
  			console.log("error: " +err.message);
  			$(".GaugeMeter").gaugeMeter();
  				var _gaq = _gaq || [];
  				  _gaq.push(['_setAccount', 'UA-36251023-1']);
  				  _gaq.push(['_setDomainName', 'jqueryscript.net']);
  				  _gaq.push(['_trackPageview']);

  				  (function() {
  				    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  				    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
  				    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  				  })();
  		} else {
  			if(data.scoring.length == 3){
  				console.log("success");

  				for(var id in data.scoring){
  					switch(data.scoring[id].Day) {
  					    case 1:
  					        $(document.getElementById('PreviewGaugeMeter_1')).attr("data-percent", data.scoring[id].Dim);
                    document.getElementById('power1').innerHTML = data.scoring[id].Predicted_Power + " W";
  					        if(data.scoring[id].PIR == "OFF"){
  					        	$(document.getElementById('pir_yes1')).attr("checked", false);
  					        	$(document.getElementById('pir_no1')).attr("checked", true);
  					        }else{
  					        	$(document.getElementById('pir_yes1')).attr("checked", true);
  					        	$(document.getElementById('pir_no1')).attr("checked", false);
  					        }
  					        break;
  					    case 2:
  					        $(document.getElementById('PreviewGaugeMeter_2')).attr("data-percent", data.scoring[id].Dim);
                    document.getElementById('power2').innerHTML = data.scoring[id].Predicted_Power + " W";
  					        if(data.scoring[id].PIR == "OFF"){
  					        	$(document.getElementById('pir_yes2')).attr("checked", false);
  					        	$(document.getElementById('pir_no2')).attr("checked", true);
  					        }else{
  					        	$(document.getElementById('pir_yes2')).attr("checked", true);
  					        	$(document.getElementById('pir_no2')).attr("checked", false);
  					        }
  					        break;
  					    case 3:
  					        $(document.getElementById('PreviewGaugeMeter_3')).attr("data-percent", data.scoring[id].Dim);
                    document.getElementById('power3').innerHTML = data.scoring[id].Predicted_Power + " W";
  					        if(data.scoring[id].PIR == "OFF"){
  					        	$(document.getElementById('pir_yes3')).attr("checked", false);
  					        	$(document.getElementById('pir_no3')).attr("checked", true);
  					        }else{
  					        	$(document.getElementById('pir_yes3')).attr("checked", true);
  					        	$(document.getElementById('pir_no3')).attr("checked", false);
  					        }
  					        break;
  					    default:
  					        console.log("score not found");
  					}
  				}


  				$(".GaugeMeter").gaugeMeter();
  				var _gaq = _gaq || [];
  				  _gaq.push(['_setAccount', 'UA-36251023-1']);
  				  _gaq.push(['_setDomainName', 'jqueryscript.net']);
  				  _gaq.push(['_trackPageview']);

  				  (function() {
  				    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  				    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
  				    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  				  })();
  			}
  		}
  		
  	}
});
} else {

  $(document.getElementById('PreviewGaugeMeter_1')).attr("data-percent", 90);
  $(document.getElementById('pir_yes1')).attr("checked", false);
  $(document.getElementById('pir_no1')).attr("checked", true);
  $(document.getElementById('PreviewGaugeMeter_2')).attr("data-percent", 90);
  $(document.getElementById('pir_yes2')).attr("checked", false);
  $(document.getElementById('pir_no2')).attr("checked", true);
  $(document.getElementById('PreviewGaugeMeter_3')).attr("data-percent", 30);
  $(document.getElementById('pir_yes3')).attr("checked", true);
  $(document.getElementById('pir_no3')).attr("checked", false);
  $(".GaugeMeter").gaugeMeter();
  var _gaq = _gaq || [];
    _gaq.push(['_setAccount', 'UA-36251023-1']);
    _gaq.push(['_setDomainName', 'jqueryscript.net']);
    _gaq.push(['_trackPageview']);

    (function() {
      var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
      ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
      var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
    })();

}
function initSlider(){
  slider4= new Slider("#ex4", {
    value: parseInt(localStorage.getItem('PWMDuty')),
    formatter: function(value) {
      document.getElementById('duty').innerHTML = value +" %";
      return 'Current value: ' + value;
    }
  });
}
initSlider();

$('.check_class4').on('change', function() {
    $('.check_class4').not(this).prop('checked', false);  
});
