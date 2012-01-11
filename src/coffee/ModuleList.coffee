class ModuleList
	constructor: () ->
		@bg = chrome.extension.getBackgroundPage()

	showMessage: (message) =>
		box = document.createElement('div')
		box.innerHTML = message
		box.setAttribute('class', 'message')

		document.body.appendChild(box)

	onupdate: () =>
		if @bg.checker.getModules()
			@showModules(@bg.checker.getModules())
		else
			@showMessage("Auf das System kann nicht zugegriffen werden.")


	initView: () =>
		@bg.checker.onupdate = @onupdate

	showModules: (modules) =>
		@clearView()
		for mod in modules
			document.body.appendChild(new ModuleView(mod).getNode())

	clearView: () =>
		node = document.body
		if node.hasChildNodes()
			while node.childNodes.length >= 1
				node.removeChild(node.firstChild)

root = exports ? this
root.ModuleList = ModuleList
