class ESChecker
	constructor: (@config) ->
		@parser = new Parser()
		@searcher = new Searcher()
		@modules = new Array()

	getModules: () -> return @modules

	check: () ->
		@modules = new Array()
		cnt = 0

		@parser.getName(klassenliste_test)
		@modules[0] = @parser.parseModule(klassenliste_test)
		cnt = @searcher.getUnregisteredCount(@modules)

		@onupdate(@modules, cnt)

	startChecking: () ->
		@check()
		setInterval(@check, @config.getInterval())

	onupdate: (modules, unregistered_count) ->
		

root = exports ? this
root.ESChecker = ESChecker
