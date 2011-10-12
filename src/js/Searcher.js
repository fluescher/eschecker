
var Searcher = function() {
	self = this;
	
	self.getMyRegistration = function(name, module){
		var registration = new Registration();
		
		for(var reg in module.registrations){
			var act = module.registrations[reg];
			if(act.name === name.name && act.prename === name.prename){
				return act;	
			}
		}
		
		return false;
	}
	
};
