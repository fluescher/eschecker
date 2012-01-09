class ESChecker
	isConnected: false

	constructor: (@config) ->
		@parser = new Parser(@config.getUrl())
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
			@isConnected = false
			return

		@modules = @parser.getModules(data)
		cnt = @searcher.getUnregisteredCount(@modules)

		@onupdate(@modules, cnt)

	startChecking: () =>
		@check()
		setInterval(@check, @config.getInterval())

	onupdate: (modules, unregistered_count) -> 

root = exports ? this
root.ESChecker = ESChecker
