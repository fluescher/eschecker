class ESChecker
	constructor: (@config) ->
		@parser = new Parser(@config)
		@searcher = new Searcher()
		@modules = false

	getModules: () -> return @modules

	getOverviewHtml: () =>
		hadError = false
		html = ""

		$.ajax({
			url: @config.getUrl() + "/36",
			success: (data) => (html = data),
			error: (data) => (hadError = true),
			dataType: "text", async: false})

		if hadError == true
			return false

		return html

	check: () =>
		@isConnected = true
		@modules = new Array()
		cnt = 0

		data = @getOverviewHtml()

		if data == false
			@modules = false
			return

		@modules = @parser.getModules(data)
		cnt = @searcher.getUnregisteredCount(@modules) if @modules != false
		
		if cnt > 0
			chrome.browserAction.setBadgeBackgroundColor({color: [255, 0, 0, 255]})
			chrome.browserAction.setBadgeText({text: '' + cnt})
		else
			chrome.browserAction.setBadgeText({text: ""})

		@onupdate()

	startChecking: () =>
		@check()
		setInterval(@check, @config.getInterval())

	onupdate: () ->

root = exports ? this
root.ESChecker = ESChecker
