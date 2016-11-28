/*******************************************************************************
* Copyright (c) 2016 IBM Corporation and other Contributors.
*
* All rights reserved. 
*
* Contributors: CLEMENCE LEBRUN
* IBM - Initial Contribution
*******************************************************************************/


var RealtimeGraph = function(){

	var palette = new Rickshaw.Color.Palette( { scheme: [
        "#7f1c7d",
 		"#00b2ef",
		"#00649d",
		"#00a6a0",
		"#ee3e96",
		"#FF6600",
		"#33CC33",
		"#996633",
		"#00FFFF",
		"#FFFF00",
		"#999966",
		"#003300",
		"#CC0000",
		"#993333",
		"#009933"

    ] } );
	
	// function to invoke Rickshaw and plot the graph
	this.drawGraph = function(seriesData)
	{
		// instantiate our graph!
		this.palette = palette;
		if(document.getElementById("chart") != null){
			this.graph = new Rickshaw.Graph( {
				element: document.getElementById("chart"),
				width: 600,
				height: 250,
				renderer: 'line',
				stroke: true,
				preserve: true,
				series: seriesData	
			} );
		}else{
			return null;
		}
		

		this.graph.render();

		this.hoverDetail = new Rickshaw.Graph.HoverDetail( {
			graph: this.graph,
			xFormatter: function(x) {
				return new Date(x * 1000).toString();
			}
		} );

		this.annotator = new Rickshaw.Graph.Annotate( {
			graph: this.graph,
			element: document.getElementById('timeline')
		} );

		this.legend = new Rickshaw.Graph.Legend( {
			graph: this.graph,
			element: document.getElementById('legend')

		} );

		this.shelving = new Rickshaw.Graph.Behavior.Series.Toggle( {
			graph: this.graph,
			legend: this.legend
		} );

		this.order = new Rickshaw.Graph.Behavior.Series.Order( {
			graph: this.graph,
			legend: this.legend
		} );

		this.highlighter = new Rickshaw.Graph.Behavior.Series.Highlight( {
			graph: this.graph,
			legend: this.legend
		} );

		this.smoother = new Rickshaw.Graph.Smoother( {
			graph: this.graph,
			element: document.querySelector('#smoother')
		} );

		this.ticksTreatment = 'glow';

		this.xAxis = new Rickshaw.Graph.Axis.Time( {
			graph: this.graph,
			ticksTreatment: this.ticksTreatment,
			timeFixture: new Rickshaw.Fixtures.Time.Local()
		} );

		this.xAxis.render();

		this.yAxis = new Rickshaw.Graph.Axis.Y( {
			graph: this.graph,
			tickFormat: Rickshaw.Fixtures.Number.formatKMBT,
			ticksTreatment: this.ticksTreatment
		} );

		this.yAxis.render();


		this.controls = new RenderControls( {
			element: document.querySelector('form'),
			graph: this.graph
		} );

	}

	this.updateLocalStorage = function(data){
		if (typeof(Storage) !== "undefined") {
		    // Store
		    localStorage.setItem("PWMFreqDiv", data['PWMFreqDiv']);
		    localStorage.setItem("PWMMode", data['PWMMode']);
		    localStorage.setItem("PWMDuty", data['PWMDuty']);
		    localStorage.setItem("state_charge", data['state_charge']);
		    localStorage.setItem("state_light", data['state_light']);
		    localStorage.setItem("lowBat", data['lowBat']);
		    localStorage.setItem("BProtary", data['BProtary']);
		    localStorage.setItem("Vbat", data['Vbat']);
		    localStorage.setItem("Vphoto", data['Vphoto']);
		    localStorage.setItem("Iphoto", data['Iphoto']);
		    localStorage.setItem("Pphoto", data['Pphoto']);
		    localStorage.setItem("DieTemperature", data['DieTemperature']);
		    localStorage.setItem("nuit", data['nuit']);

		    updateVal();

		} else {
		    window.alert("Browser does not support this app version");
		}

	}




		    
	this.graphData = function(data)
	{
		if((this.graph != null) && (document.getElementById('charge') == null )){
			var key = 0;
			var seriesData = [];
			var timestamp = Date.now()/1000;
			var maxPoints = 25; 
			for (var j in data)
			{
				if (typeof data[j] !== 'string') {
					this.graph.series[key].data.push({x:timestamp,y:data[j]});
					if (this.graph.series[key].data.length > maxPoints)
					{
						this.graph.series[key].data.splice(0,1);//only display up to maxPoints
					}
					key++;
				}
			}
			this.graph.render();
		}
			
	}
	this.graphDataCharge = function(data)
	{
		if(document.getElementById('charge') != null ){
			var key = 0;
			var seriesData = [];
			var timestamp = Date.now()/1000;
			var maxPoints = 25; 
			for (var j in data)
			{
				if (typeof data[j] !== 'string') {
					if(j == 'Vbat'){
						this.graph.series[key].data.push({x:timestamp,y:data[j]});
						if (this.graph.series[key].data.length > maxPoints)
						{
							this.graph.series[key].data.splice(0,1);//only display up to maxPoints
						}
						key++;
					}
					
				}
			}
			this.graph.render();
		}
			
	}
	this.updateGauge = function(data)
	{
		if(document.getElementById('gauge') != null){
			for (var j in data)
			{
				if (typeof data[j] !== 'string') {
					if(j == 'Loudness'){
						
						needle.moveTo(data[j]);
						break;
					}
				}
			}
		}
		
		
	}
	this.displayChart = function(device,data){
		if( document.getElementById('charge') == null ){

			var key = 0;
			var seriesData = [];
			var timestamp = Date.now()/1000;
			for (var j in data)
			{	
				if (typeof data[j] !== 'string') {
					seriesData[key]={};
					seriesData[key].name=j;
					seriesData[key].color = palette.color();
					seriesData[key].data=[];

					seriesData[key].data[0]={};
					seriesData[key].data[0].x = timestamp;
					seriesData[key].data[0].y = data[j];
					key++;
				}
				
			}

			this.drawGraph(seriesData);
		}
	}
	this.displayChartCharge = function(device,data){
		if(document.getElementById('charge') != null ){

			var key = 0;
			var seriesData = [];
			var timestamp = Date.now()/1000;
			for (var j in data)
			{
				if (typeof data[j] !== 'string') {
					if(j == 'Vbat'){
						seriesData[key]={};
						seriesData[key].name=j;
						seriesData[key].color = palette.color();
						seriesData[key].data=[];

						seriesData[key].data[0]={};
						seriesData[key].data[0].x = timestamp;
						seriesData[key].data[0].y = (data[j]/1000)*3;
						key++;
					}
					
				}
			}

			this.drawGraph(seriesData);
		}
	}
};

function updateVal()
{
	var behaviour = " Real Time";
	var vbatMax = 58;

	var efficiencyRef = 20;


	// sensors from I2C;

	var duty = localStorage.getItem('PWMDuty');
	//var power = localStorage.getItem('Pphoto')/100000;
	var vbat = localStorage.getItem('Vbat')/1000; // en volt
	var state_light = localStorage.getItem('state_light');
	var state_charge = localStorage.getItem('state_charge'); // si = 0 alors iPhoto = 0
	var low_bat = localStorage.getItem('lowBat');
	var device_temp = localStorage.getItem('DieTemperature');

	var v_photo = localStorage.getItem('Vphoto')/1000; // volt
	//var p_photo = localStorage.getItem('Pphoto'); // invalide

	var i_photo = localStorage.getItem('Iphoto')/1000; // amp
	// power = iphoto * vbat
	var p_photo = (i_photo * vbat)/0.9;
	var power = p_photo;
	// calc % of battery charge
	var chargePerc = ((vbat/vbatMax)*100).toFixed(1);
	if(chargePerc > 100){
		chargePerc = 100;
	}else if (chargePerc < 0){
		chargePerc = 0;
	}
	
	if(state_charge == 0){
		i_photo = 0;
	}
	if(state_light == 0){
		duty = 0;
	}
	// other sensors
	var loudSensor = null;
	var lightSensor = null;

	//set mode motion sensor active or not depending on current duty
	var modeMotionSensor = "NO";
	if((duty <= 60) && (duty > 0)){
		modeMotionSensor = "YES";
	}else{
		modeMotionSensor = "NO";
	}
	
	if (document.getElementById('motionsensormode') != null)
		document.getElementById('motionsensormode').innerHTML = modeMotionSensor;
	if (document.getElementById('state_') != null)
		document.getElementById('state_').innerHTML = " Real Time";
	if (document.getElementById('duty') != null){
		//document.getElementById('duty').innerHTML = duty +"%";
		//updateValueFromDuty(duty);
	}
	if(document.getElementById('loudness')!= null){
		document.getElementById('loudness').innerHTML = Math.round(loudSensor *100) +" %";
	}
	if(document.getElementById('power') != null){
		document.getElementById('power').innerHTML = power.toFixed(1);
	}
	if(document.getElementById('light') != null ){
		document.getElementById('light').innerHTML = Math.round(lightSensor*100) +" %";
	}
	if(document.getElementById('motion') != null){ // motion div home or urban
		if(document.getElementById('motion-text') != null){ //urban
			if(motionSensor == 0){
				document.getElementById('motion').className = "fa fa-male fa-5x";
				document.getElementById('motion-text').innerHTML = "No detected presence";
			} else if(motionSensor == 1){
				document.getElementById('motion').className = "fa fa-child fa-5x";
				document.getElementById('motion-text').innerHTML = "Detected presence";
			}
		}else{ //home page
			document.getElementById('motion').innerHTML = motionSensor;
		}
	}
	if(document.getElementById('voltage_b') != null ){ //home page
		document.getElementById('voltage_b').innerHTML = vbat.toFixed(1);
	}
	if(document.getElementById('charge') != null ){ // 
		document.getElementById('charge').innerHTML = chargePerc;
		
	}
	if(document.getElementById('charge_perc') != null ){ // 
		document.getElementById('charge_perc').innerHTML = chargePerc +" %";
	}
	if(document.getElementById('efficiency') != null){
		document.getElementById('efficiency').innerHTML = ((power/efficiencyRef)*100).toFixed(1)+" %";
	}
	if(document.getElementById('charging-img') != null){ //production page
		if(state_charge==0){ // not charging
			document.getElementById('charging-img').style.display='none';
			document.getElementById('discharging-img').style.display='block';
		}else if(state_charge!=0){ //charging
			//Gif battery charging
			document.getElementById('charging-img').style.display='block';
			document.getElementById('discharging-img').style.display='none';
		}
		if(state_light!='0'){ //  lamp on

			document.getElementById('lamp').innerHTML = "Turned On";
			document.getElementById('panel_light').style.backgroundColor="gold";
		}else if(state_light=='0'){ //lamp off

			document.getElementById('lamp').innerHTML = "Turned Off";
			document.getElementById('panel_light').style.backgroundColor="Gainsboro";
		}
	}
	if(document.getElementById('intensity') != null){
		document.getElementById('intensity').innerHTML = i_photo;
	}
	if(document.getElementById('voltage') != null){
		document.getElementById('voltage').innerHTML = v_photo.toFixed(1);
	}
	/*if(document.getElementById('power_s') != null){
		document.getElementById('power_s').innerHTML = (data['Power']/100).toFixed(1);
	}*/
	if(document.getElementById('state_low') != null){ //home page STATE
		if(state_charge==1){ //charging on state home page
			if(document.getElementById('state_charging') != null){
				document.getElementById('state_charging').checked = true;
			}
		}else if(state_charge==0){
			if(document.getElementById('state_charging') != null){
				document.getElementById('state_charging').checked = false;
			}
		}
		if (state_light=='0'){ // light off on state home page
			if(document.getElementById('state_light') != null){
				document.getElementById('state_light').checked = false;
			}
		}else if (state_light !='0'){ // light on
			if(document.getElementById('state_light') != null){
				document.getElementById('state_light').checked = true;
			}
		}
		if(low_bat ==0){
			if(document.getElementById('state_low') != null){
				document.getElementById('state_low').checked = false;
			}
		}else if(low_bat != 0){
			if(document.getElementById('state_low') != null){
				document.getElementById('state_low').checked = true;
				document.getElementById('state_full').checked = false;
			}
		}
		if(document.getElementById('state_full') != null){
			if(low_bat ==0){
				if(chargePerc >= 100.0){
					document.getElementById('state_full').checked = true;
				} else{
					document.getElementById('state_full').checked = false;
				}
			}
		}
		if(document.getElementById('state_power') != null){
			document.getElementById('state_power').checked = true; //power always true
		}
		
	}
	if(document.getElementById('current_dim') != null){
		document.getElementById('current_dim').innerHTML = duty +" %";
	}
};

