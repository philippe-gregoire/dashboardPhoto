============================================================
Admin Dashboard Photocontroller V2 (Node.js app) on Bluemix.
============================================================

This Node.js app demonstrates the Bluemix capabilities to create industry related projects about Internet of Things, Analytics and cloud topics. In order to make this app working properly with the real device you will need either the lamp device or the DB credentials and the IoT service api key/token to access the data.

# Before you begin

- Create a Bluemix account
        Sign up in Bluemix, or use an existing account. Your account must have available space for at least 1 app and 1 service.
- To develop locally: Make sure that you have the following prerequisites installed:
        The Node.js runtime (including the npm package manager)
        The Cloud Foundry command-line client

# Deploy automatically to Bluemix

- firstable you need to create a Weather Company data service if you do not have one already

- then deploy automatically: 
[![Deploy to Bluemix](https://bluemix.net/deploy/button.png)](https://bluemix.net/deploy?repository=https://github.com/cllebrun/dashboardPhoto.git)

- Access the online code editor to update the app.js (at the end of the deployment, there is a "edit code button"): 
    - with your own Weather Company data service credential: var weather_host =  "https://username:password@twcservice.mybluemix.net";
    - with the right cloudant credentials, the instructor will give to you;
    - with the right watson conversation credentials, the instructor will give to you;

# Deploy manually to Bluemix

1. Connect to Bluemix:
    https://console.ng.bluemix.net
    Create a Weather Company data service if you do not have one already
2. Download and install the Cloud-foundry CLI tool if you haven't already : https://github.com/cloudfoundry/cli/releases
    
3. Download the project from Git:
- Browse https://github.com/cllebrun/dashboardPhoto.git

- Click on "Download ZIP" on the right of the page
- Unzip the folder
or
- clone the project

- Open the folder and the "manifest.yml" file and edit it to change the name and the host with the name you gave to the application you created on Bluemix.
- open the app.js and make the following updates:
    - with your own Weather Company data service credential: var weather_host =  "https://username:password.mybluemix.net";
    - with the right cloudant credentials, the instructor will give to you;
    - with the right watson conversation credentials, the instructor will give to you;

4. Push the app to Bluemix
- Open the Command prompt and locate to the project folder you have just unzipped. (with cd command)
- Connect to Bluemix using command line (download CF CLI first: https://github.com/cloudfoundry/cli/releases):

    cf api https://api.ng.bluemix.net

- Log into Bluemix using command line:

    cf login 

- Deploy your app to Bluemix:

    cf push

- Wait for your app to be started
- Access your app: <your-bluemix-application-name.mybluemix>.net

    Visualize the data from the Urban Light data on your real-time dashbord app !


# Install & Run locally

- you will need to install node.js
- from your project root download the libraries:

    npm install

- start your project:

    node app.js

# Customization

#### Realtime data: 

FORMAT sent by your connected street light V2 device: 

        { "topic": "iot-2/type/PhotocontrollerV2/id/b827eb892163/evt/status/fmt/json", "payload": { "PWMFreqDiv": 0, "PWMMode": 0, "PWMDuty": 0, "state_light": 0, "lowBat": 0, "BProtary": 0, "Vbat": 36073, "Vphoto": 2542, "Iphoto": 0, "Pphoto": 0, "DieTemperature": 27, "nuit": 0 }, "deviceId": "b827eb892163", "deviceType": "PhotocontrollerV2", "eventType": "status", "format": "json", "_msgid": "57ebc7d3.a81438" }

Data parsed in the app in public > js > realtime > realtimeGraph()
Simulation data in :
public > js > realtime > realtime.js
public > js > generalSimul.js (when not connected to the Watson IoT platform)

   The components for the realtime data visualization are placed in the files realtime.js and realtimeGraph.js in this folder.

        public\js\realtime\
    
        \realtime.js
    
        \realtimeGraph.js

*realtimeGraph.js*: This file contains the graph and it's related functions.This is written in the same style as historianGraph.js above.So you can follow the guidelines for historianGraph.js to customize the code.

*realtime.js* : This file intializes the graph and subscribes to the mqtt topics to get realtime device data from IBM IOT cloud.


 *Change the color of the graph*: In the below section of code you can change the hexadecimal codes to change the color of the graph data.
    
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

 This instantiates the graph and set the intial renderer to line.

        
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
          }

