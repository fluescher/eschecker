# Configuration used to access local storage of the browser
class Configuration
	@DEFAULT_URL: "https://es.fhnw.ch/node/"
	@DEFAULT_INTERVAL: 300000

	getUrl: () -> 
		if localStorage.getItem("url") == null
			localStorage["url"] = Configuration.DEFAULT_URL
		return localStorage["url"]

	getInterval: () ->
		if localStorage.getItem("interval") == null
			localStorage["interval"] =  Configuration.DEFAULT_INTERVAL
		return localStorage["interval"]

	setInterval: (interval) ->
		localStorage["interval"] = interval

	setUrl: (url) ->
		localStorage["url"] = url

root = exports ? this
root.Configuration = Configuration

