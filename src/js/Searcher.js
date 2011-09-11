
var Searcher = function() {
	self = this;
	
	self.isRegistered = function(name, module) {
		var registered = false;
		
		for( var reg in module.registrations) {
			var act = module.registrations[reg];
			if (act.name === name.name & act.prename === name.prename) {
				return true;
			}
		}
		return registered;
	};
	
};
