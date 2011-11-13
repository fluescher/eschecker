
class Configuration
	getUrl: () -> 
		return localStorage["url"]

	setInterval: (interval) ->
		localStorage["interval"] = interval

	setURL: (url) ->
		localStorage["url"] = url

root = exports ? this
root.Configuration = Configuration

