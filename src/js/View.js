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
			title.innerText = self.module.name;
		
			var registration = document.createElement('div');
			registration.innerText = self.module.registrations.length;
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
		detail.style.display = "none";
		
		for (var index in self.module.registrations) {
			var reg = document.createElement('div');
			reg.innerText = self.module.registrations[index].name;
			detail.appendChild(reg);
		}
		
		return detail;
	}
};

var base = "../../tests";
var parser = new Parser(base);
var myself = {};

$.ajax({
	url: base + "/data/overview.html",
	success: function(data) {
		myself = parser.getName(data);	
		var modules = parser.getModules(data);
		showModules(modules);
	},
	dataType: "text"
});

var reg = new Registration();
reg.name ="Lüscher";
reg.prename="Florian";
reg.amIRegistered = true;

var reg2 = new Registration();
reg2.name ="Lüscher";
reg2.prename="Florian";
reg2.amIRegistered = true;

var reg3 = new Registration();
reg3.name ="Lüscher";
reg3.prename="Florian";
reg3.amIRegistered = true;

var mod = new Module();
mod.name = "Programmieren C++ (prcpp)";
mod.registrations.push(reg);
mod.registrations.push(reg2);
mod.registrations.push(reg3);
mod.amIRegistered = true;

var mod2 = new Module();
mod2.name = "Usability and User Interface Design (uuid)";
mod2.registrations.push(reg);
mod2.registrations.push(reg2);
mod2.registrations.push(reg3);
mod2.amIRegistered = true;

function initView() {
	showModules([mod, mod2]);
}

function showModules(modules) {
	for(var i = 0; i < 20; i++) {
		document.body.appendChild(new ModuleView(modules[i % modules.length]).getNode());
	}
};
