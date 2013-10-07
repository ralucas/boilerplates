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

// Filter function
var filter = function(arr, f) {
	var output = [];

	for(var i=0; i<arr.length-1; i++) {
	if( f(arr[i]) ) {
		output.push(arr[i]);
		}
	}
	return output;
};

/**For picking random quotes from an object!*/

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

//Randomizer

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