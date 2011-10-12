var Configuration = function() {
	var self = this;
	
	this.getURL = function() {
		return localStorage["url"];
	}
	
	this.getInterval = function() {
		return localStorage["interval"];
	}	
	
	this.setInterval = function(newInterval) {
		localStorage["interval"] = newInterval;
	}
	
	this.setURL = function(newURL) {
		localStorage["url"] = newURL;
	}
}
