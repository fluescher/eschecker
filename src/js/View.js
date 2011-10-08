var ModuleView = function(_module) {
	var self = this;
	self.module = _module;
		
	this.getNode = function() {
		var node = document.createElement('div');
		node.setAttribute('class', 'module');
		
		title = document.createElement('div');
		$(title).addClass('title');
		title.innerText = self.module.name;
		
		registration = document.createElement('div');
		registration.innerText = self.module.registrations.length;
		$(registration).addClass('registrationCount');
		$(registration).addClass(self.module.amIRegistered ? 'green' : 'red');
		
		title.appendChild(registration);
		
		node.appendChild(title);
		return node;
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
reg.isRegistered = true;

var mod = new Module();
mod.name = "test";
mod.registrations.push(reg);
mod.isRegistered = true;

function initView() {
	showModules([mod]);
}

function showModules(modules) {
	for(var i = 0; i < modules.length; i++) {
		document.body.appendChild(new ModuleView(modules[i]).getNode());
	}
};
