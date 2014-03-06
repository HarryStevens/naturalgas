/**
 * @author Harry Stevens
 */

/*
 * STEPS:
 * 1. Document ready will call pageReady function
 * 2. pageReady funciton will load the Google visualization library and call googleReady function
 * 3. googleReady function will load the json from the fusion table and call dateReady function
 * 4. dataReady function will format the data, feed it into the Google visualization library, and display it on the page
 */

//1. Document ready will call pageReady function
$(document).ready(MpageReady);

//2. pageReady funciton will load the Google visualization library and call googleReady function
function MpageReady(){
	google.load("visualization", "1", {packages:["corechart"],callback:MgoogleReady});
}

//3. googleReady function will load the json from the fusion table and call dateReady function
function MgoogleReady(){
	$.get("https://www.googleapis.com/fusiontables/v1/query?sql=SELECT+*+FROM+1LOmK0eFCAtFjzFW-kVx7dlbRcIJNSEC4wN7SD-da&key=AIzaSyB-QJux9WIJmey5IJYzPImNzg-xP1gpvU8",MdataReady,"json");
}

//4. dataReady function will format the data, feed it into the Google visualization library, and display it on the page
function MdataReady(GAS){
	var dataArray = []; //empty array to populate with formatted data and feed to google viz
	var rows = (GAS.rows);//grabbing the rows object from the GAS fusion table data
	
	//This loop will format the data. This is necessary because the dates are formatted as strings and need to be read as actual dates
	for(var i=0;i<rows.length;i++){
		var currRow = rows[i];
		
		//Moment.js will convert the date string to an actual date
		var currDate = currRow[0];
		var momentDate = moment(currDate);
		var finalDate = momentDate._d;
		
		//Grab the value from each row array
		var finalVal = currRow[1];
		
		//Create a looping array with my finalDate and finalVal
		var currArray = [finalDate,finalVal];
		
		//Populate dataArray with formatted arrays
		dataArray.push(currArray);
		}
	
	//The below code uses the Google charts library
	
	//Feeds data to Google Viz library
	var Gdata = new google.visualization.DataTable();
	Gdata.addColumn('date', 'Date');
	Gdata.addColumn('number', 'Price');
	Gdata.addRows(dataArray);
	
	//Configures chart
	var Goptions = {
		title : 'Select a date range to zoom in. Right click to zoom out.',
		curveType : 'function',
		height : 500,
		width: 1000,
		chartArea:{width:850,height:380,left:100,right:10},
		explorer : {
			actions : ['dragToZoom', 'rightClickToReset'],
			axis : 'horizontal',
			maxZoomIn : .1
		},
		colors:['#2F4779'],
		vAxis : {
			title : 'Dollars per BTU',
			ticks: [2,4,6,8,10,12,14],
			format:'$#',
		},
		hAxis : {
			title : 'Date'
		},
		selectionMode : 'multiple',
		legend : {
			position : 'none'
		},
		backgroundColor : {
			stroke : '#000',
			strokeWidth : 4
		},
	}; 

	
	//Displays chart
	var Gchart = new google.visualization.LineChart(document.getElementById('Gchart_div'));
	Gchart.draw(Gdata, Goptions);
	
}
