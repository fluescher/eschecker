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
	maxregistrations: 0
	shortname: ""
	position: 0
	registrations: []
	amIRegistered: false
	
	constructor: () ->
		@registrations = []
	
	getmaxregistrations: () ->
		@maxregistrations = @name.match(/\/\s\d+\s/).toString()
		@maxregistrations = @maxregistrations.substring(2)
		@maxregistrations = @maxregistrations.trim()


root = exports ? this
root.Registration = Registration
root.Module = Module

