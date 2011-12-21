
class Configuration
	getUrl: () -> 
		return localStorage["url"]

	getInterval: () ->
		return localStorage["interval"]

	setInterval: (interval) ->
		localStorage["interval"] = interval

	setUrl: (url) ->
		localStorage["url"] = url

root = exports ? this
root.Configuration = Configuration

