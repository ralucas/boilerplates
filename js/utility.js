//supplant
if (!String.prototype.supplant) {
	String.prototype.supplant = function (o) {
		return this.replace(
			/\{([^{}]*)\}/g,
			function (a, b) {
				var r = o[b];
				return typeof r === 'string' || typeof r === 'number' ? r : a;
			}
		);
	};
}

//sorting
var descendingObj = function(a, b, key){
	if(a[key] > b[key])
		return 1;
	if(a[key] > b[key])
		return -1;
	return 0;
};

var ascendingObj = function(a, b, key){
	if(b[key] > a[key])
		return 1;
	if(b[key] > a[key])
		return -1;
	return 0;
};

// filter functions
var filter = function(arr, f) {
	var output = [];

	for(var i=0; i<arr.length-1; i++) {
	if( f(arr[i]) ) {
		output.push(arr[i]);
		}
	}
	return output;
};

//expanded for arrays of arrays
var filterDeep = function (arr, value, index){
	var output = [];
	for(var i = 0; i < arr.length; i++){
		if(value === arr[i][index])
			output.push(arr[i]);
	}
	return output;
};

//search function
var search = function (arr, value, index){
		var re = new RegExp(value, 'gi');
		var filtered = [];
		for(var i = 0; i < arr.length; i++){
			if(arr[i][index].match(re)){
				filtered.push(arr[i]);
			}
		}
		return filtered;
	};


//for picking random properties in an object
function pickRandomProperty(obj) {
	var result;
	var count = 0;
	for (var prop in obj)
		if (Math.random() < 1/++count)
		   result = prop;
	return result;
}

function pickRandomObject (arr) {
	var result;
	for (var i=0; i < arr.length-1; i++) {
		if (Math.random() < 1/i)
		   result = arr[i];
   }
	return result;
}

//randomizer
var randomizer = function(a, b){
	a = Math.floor(Math.random()*101);
	b = Math.floor(Math.random()*101);

	if(a > b && a%b === 0){
		console.log(a);
		if (a < b && b%a === 0){
		  console.log(b);
		}
	}
	else{
		console.log("Sorry. Cannot Compute!");
	}
};

//split array in array of arrays
var splitArray = function (arr, count){
		var newArray = [];
		var totArrays = 0;
		var rem = arr.length%count;
		var sub = count - rem;
		if(arr.length <= count){
			return arr;
		}
		else{
			if(arr.length%count === 0){
				totArrays = Math.floor(arr.length/count);
			}
			else{
				totArrays = Math.floor(arr.length/count) + 1;
			}
			for(var i = 0; i < totArrays; i++){
				var l = 0;
				if(i < totArrays - 1){
				l = count*(i+1);
				}
				else{
				l = (count*(i+1)) - sub;
				}
				var k = (count*i);
				newArray[i] = [];
				for(var j = k; j < l; j++){
					newArray[i].push(arr[j]);
				}
			}
		}
		return newArray;
	};

//finds current location from HTML5 Geolocation API in browser
var geoFindMe = function () {
		geoObj = {}; //may want to put in global space if used
		if (!navigator.geolocation){
			console.error("Geolocation is not supported by your browser");
		}
		function success(position) {
			var latitude  = position.coords.latitude;
			var longitude = position.coords.longitude;
			console.log('Latitude is ' + latitude + '°; Longitude is ' + longitude + '°');
			geoObj = {
				lat : latitude,
				lon : longitude
				};
			// Can pull in image of location from google api
			// var img = new Image();
			// img.src = "http://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=300x300&sensor=false";
			//$('#output').append(img);
			}
		function error() {
			console.error("ERROR: Unable to retrieve your location");
		}
		navigator.geolocation.getCurrentPosition(success, error);
	};

//if using calculate distance with geolocation
//you will need to use a set timeout to allow
//geolocation to calculate before calculating distances

//calculate distance based on two points
function calculateDistanceTwoPoints(lat1, lon1, lat2, lon2) {
	var R = 6371; // km
	var dLat = (lat2 - lat1).toRad();
	var dLon = (lon2 - lon1).toRad();
	var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
			Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) *
			Math.sin(dLon / 2) * Math.sin(dLon / 2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	var d = R * c;
	return d;
	}

//creates prototype to convert radii to distance
Number.prototype.toRad = function() {
  return this * Math.PI / 180;
};

//calculate distance from one point to a variety of points
//currently uses underscore function _.each
function calculateDistance(obj, arr, distanceFrom) {
	var R = 3959; // miles of Earth radius 
	var latitude = obj.lat;
	var longitude = obj.lon;
	var output = [];
	_.each(arr, function(arrObj){
		var dLat = (arrObj['lat'] - latitude).toRad();
		var dLon = (arrObj['lon'] - longitude).toRad();
		var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
				Math.cos(latitude.toRad()) * Math.cos(arrObj['lat'].toRad()) * 
				Math.sin(dLon / 2) * Math.sin(dLon / 2);
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		var d = R * c;
		arrObj['distance'] = d;
		if(arrObj['distance'] <= distanceFrom){
			output.push(arrObj);
        }
    });
    return output;
}