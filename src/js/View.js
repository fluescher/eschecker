var ModuleView = function(_module) {
	var self = this;
	self.module = _module;
	self.node = null;
	self.detail_node = null;
	
	this.toggleDetailView = function() {
		$(self.detail_node).slideToggle();
	}
	
	this.getNode = function() {
		if (self.detail_node == null) {
			var node = document.createElement('div');
			node.setAttribute('class', 'module');
		
			var title = document.createElement('div');
			$(title).addClass('title');
			title.innerHTML = self.module.name;
		
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

var base = "../../tests";
var parser = new Parser(base);
var myself = {};

var reg = new Registration();
reg.position = Math.floor(Math.random()*30);
reg.name =unescape("Brun");
reg.prename="Matthias";
reg.amIRegistered = true;

var reg2 = new Registration();
reg2.position = Math.floor(Math.random()*30);
reg2.name =unescape("Walther");
reg2.prename="Patrick";
reg2.amIRegistered = true;

var reg3 = new Registration();
reg3.position = Math.floor(Math.random()*30);
reg3.name =unescape("L%FCscher");
reg3.prename="Florian";
reg3.amIRegistered = true;

var mod = new Module();
mod.name = "Programmieren C++ (prcpp)";
mod.registrations.push(reg);
mod.registrations.push(reg2);
mod.registrations.push(reg3);
mod.amIRegistered = true;
mod.position = Math.floor(Math.random()*30);

var mod2 = new Module();
mod2.name = "Usability and User Interface Design (uuid)";
for(i = 0; i<32; i++) {
	mod2.registrations.push(reg2);
}
mod2.registrations.push(reg);
mod2.registrations.push(reg2);
mod2.registrations.push(reg3);
mod2.amIRegistered = true;
mod2.position = Math.floor(Math.random()*30);

function initView() {
	showModules([mod, mod2]);
}

function showModules(modules) {
	for(var i = 0; i < 12; i++) {
		document.body.appendChild(new ModuleView(modules[i % modules.length]).getNode());
	}
};
