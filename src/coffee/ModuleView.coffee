class ModuleView
	module: null
	node: null
	detail_node: null
	MAX_TITLE_LENGTH: 45
	
	constructor: (modul) ->
		@module = modul

	toggleDetailView: () => $(@detail_node).slideToggle()
	
	getReadableTitle: (title) ->
		if title.length > @MAX_TITLE_LENGTH
			return title.substring(0, @MAX_TITLE_LENGTH) + "..." 
		else
			return title

	getNode: () ->
		if @detail_node == null
			node = document.createElement('div')
			node.setAttribute('class', 'module')
		
			title = document.createElement('div')
			$(title).addClass('title')
			title.innerHTML = @getReadableTitle(@module.name)
		
			registration = document.createElement('div')
			registration.innerHTML = @module.position + " / " + @module.registrations.length
			$(registration).addClass('registrationCount')
			if @module.amIRegistered
				$(registration).addClass('green')
			else
				$(registration).addClass('red')
				
			title.appendChild(registration)
		
			@detail_node = @getDetailNode()
		
			node.onclick = @toggleDetailView
			node.appendChild(title)
			node.appendChild(@detail_node)
			@node = node

		return node

	getDetailNode: () ->
		detail = document.createElement('div')
		table = document.createElement('table')
		table.setAttribute('class', 'module')
		
		table.appendChild(@getHeader())
		
		detail.style.display = "none"
		index = 0

		for regist in @module.registrations
			index = index+1
			reg = document.createElement('tr')
			
			data = document.createElement('td')
			data.innerHTML = index
			data.setAttribute('class', 'nr')
			reg.appendChild(data)
			
			data = document.createElement('td')
			data.innerHTML = regist.prename + ' ' + regist.name
			data.setAttribute('class', 'name')
			reg.appendChild(data)
			
			data = document.createElement('td')
			data.innerHTML = regist.points
			data.setAttribute('class', 'points')
			reg.appendChild(data)
			
			table.appendChild(reg)
		
		detail.appendChild(table)
		return detail

	getHeader: () ->
		header = document.createElement('tr')
		h1 = document.createElement('th')
		h1.innerHTML = '#'
		h1.setAttribute('class', 'nr')
		
		h2 = document.createElement('th')
		h2.innerHTML = 'Name'
		h2.setAttribute('class', 'name')
		
		h3 = document.createElement('th')
		h3.innerHTML = 'Punkte'
		h3.setAttribute('class', 'points')
		
		header.appendChild(h1)
		header.appendChild(h2)
		header.appendChild(h3)
		
		return header


	@initView: () ->
		chrome.browserAction.setBadgeText({text: ""})
		bg = chrome.extension.getBackgroundPage()
		bg.unregisteredModules = 0
		if (bg.modules)
			@showModules(bg.modules)

	@showModules: (modules) ->
		for mod in modules
			document.body.appendChild(new ModuleView(mod).getNode())

root = exports ? this
root.ModuleView = ModuleView



