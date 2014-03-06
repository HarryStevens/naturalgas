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
	var rows = (GAS.rows);
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
		console.log(dataArray);

}
