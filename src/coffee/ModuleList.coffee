class ModuleList
	constructor: () ->
		@bg = chrome.extension.getBackgroundPage()

	showMessage: (message, description) =>
		box = document.createElement('div')
		box.setAttribute('class', 'message')

		title = document.createElement('span')
		title.innerHTML = message
		title.setAttribute('class', 'message-title')

		desc = document.createElement('span')
		desc.innerHTML = description
		desc.setAttribute('class', 'message-desc')
		
		box.appendChild(title)
		box.appendChild(desc)
		document.body.appendChild(box)

		chrome.browserAction.setBadgeText({text: ""})

	onupdate: () =>
		if @bg.checker.getModules()
			@showModules(@bg.checker.getModules())
		else
			@showMessage("Auf das System kann nicht zugegriffen werden.", "Sind die Optionen korrekt konfiguriert und bist du am ES System angemeldet?")


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
