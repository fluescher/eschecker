var ModuleView = function(_module) {
	var self = this;
	self.MAX_TITLE_LENGTH = 45;
	self.module = _module;
	self.node = null;
	self.detail_node = null;
	
	this.toggleDetailView = function() {
		$(self.detail_node).slideToggle();
	}
	
	this.getReadableTitle = function(title) {
		if (title.length>self.MAX_TITLE_LENGTH) {
			return (title.substring(0, self.MAX_TITLE_LENGTH) + "...");
		}
		return title;
	}
	
	this.getNode = function() {
		if (self.detail_node == null) {
			var node = document.createElement('div');
			node.setAttribute('class', 'module');
		
			var title = document.createElement('div');
			$(title).addClass('title');
			title.innerHTML = self.getReadableTitle(self.module.name);
		
			var registration = document.createElement('div');
			registration.innerHTML = self.module.position + " / " + self.module.registrations.length;
			$(registration).addClass('registrationCount');
			$(registration).addClass(self.module.amIRegistered ? 'green' : 'red');
				
			title.appendChild(registration);
		
			self.detail_node = self.getDetailNode();
		
			node.onclick = self.toggleDetailView;
			node.appendChild(title);
			node.appendChild(self.detail_node)
			self.node = node;
		}
		return node;
	}
	
	this.getDetailNode = function() {
		var detail = document.createElement('div');
		var table = document.createElement('table');
		table.setAttribute('class', 'module');
		
		table.appendChild(self.getHeader());
		
		detail.style.display = "none";
		
		for (var index in self.module.registrations) {
			var reg = document.createElement('tr');
			
			var data = document.createElement('td');
			data.innerHTML = parseInt(index)+1;
			data.setAttribute('class', 'nr');
			reg.appendChild(data);
			
			data = document.createElement('td');
			data.innerHTML = self.module.registrations[index].prename + ' ' +  self.module.registrations[index].name;
			data.setAttribute('class', 'name');
			reg.appendChild(data);
			
			data = document.createElement('td');
			data.innerHTML = self.module.registrations[index].points;
			data.setAttribute('class', 'points');
			reg.appendChild(data);
			
			table.appendChild(reg)
		}
		
		detail.appendChild(table);
		return detail;
	}
	
	this.getHeader = function () {
		var header = document.createElement('tr');
		var h1 = document.createElement('th');
		h1.innerHTML = '#';
		h1.setAttribute('class', 'nr');
		
		var h2 = document.createElement('th');
		h2.innerHTML = 'Name';
		h2.setAttribute('class', 'name');
		
		var h3 = document.createElement('th');
		h3.innerHTML = 'Punkte';
		h3.setAttribute('class', 'points');
		
		header.appendChild(h1);
		header.appendChild(h2);
		header.appendChild(h3);
		
		return header;
	}
};

function initView() {
	chrome.browserAction.setBadgeText({text: ''});
	
	bg = chrome.extension.getBackgroundPage();
	bg.unregisteredModules = 0;
	
	showModules(bg.modules);
};

function showModules(modules) {
	for(var i in modules) {
		document.body.appendChild(new ModuleView(modules[i % modules.length]).getNode());
	}
};
