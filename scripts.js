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
$(document).ready(pageReady);

//2. pageReady funciton will load the Google visualization library and call googleReady function
function pageReady(){
	google.load("visualization", "1", {packages:["corechart"],callback:googleReady});
}

//3. googleReady function will load the json from the fusion table and call dateReady function
function googleReady(){
	
}
