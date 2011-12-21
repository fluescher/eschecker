class Registration
	prename: ""
	name: ""
	classe: ""
	position: 0
	isRegistered: false
	points: 0
	itsMe: false

class Module
	name: ""
	shortname: ""
	position: 0
	registrations: []
	amIRegistered: false
	
	constructor: () ->
		@registrations = []


root = exports ? this
root.Registration = Registration
root.Module = Module

