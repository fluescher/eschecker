class Searcher
	getUnregisteredCount: (modules) => 
		cnt = 0
	
		for mod in modules
			cnt++ if !mod.amIRegistered

	getMyRegistration: (name, module) => 
		registration = new Registration()

		if(module.registrations)
			for reg in module.registrations 
				return reg if reg.name == name.name and reg.prename == name.prename
		
		return false

root = exports ? this
root.Searcher = Searcher
