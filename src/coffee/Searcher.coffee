class Searcher
	getMyRegistration: (name, module) => 
		registration = new Registration()

		if(module.registrations)
			for reg in module.registrations 
				return reg if (reg.name == name.name && reg.prename == name.prename)
		
		return false


root = exports ? this
root.Searcher = Searcher

