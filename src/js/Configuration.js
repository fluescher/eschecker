var Configuration = function() {
	var self = this;
	
	self.DEFAULT_INTERVAL = 5 * 60 * 1000;
	
	this.getURL = function() {
		return localStorage["url"];
	}
	
	this.getInterval = function() {
		if(!localStorage["interval"]) {
			localStorage["interval"] = self.DEFAULT_INTERVAL;
		}
		return localStorage["interval"];
	}	
	
	this.setInterval = function(newInterval) {
		localStorage["interval"] = newInterval;
	}
	
	this.setURL = function(newURL) {
		localStorage["url"] = newURL;
	}
}
