class Parser
	TEMP_REGISTERED: "provisorisch eingeschrieben"
	myself: { name: "", prename: "" }
	baseUrl: ""
	searcher: new Searcher()

	constructor: (base) -> 
		@baseUrl = base

	getName: (overviewHTML) =>
		nameParts = $(overviewHTML).find("div#Menu_Titel").text().trim().split(" ")
		
		@myself.prename = nameParts[0]
		@myself.name = nameParts[1]
	
		return @myself

	getModules: (overviewHTML) =>
		@getName(overviewHTML)
		modules = []

		moduleTables = $(overviewHTML).find("table")
		moduleTables = moduleTables.filter((index, element, array) -> return (index != 0) )

		moduleTables.each((index, element) =>
			acturl = $(element).find("tr td a").last().attr("href")

			$.ajax({
				url: @baseUrl + "/" + acturl,
				success: (data) => modules.push(@parseModule(data)),
				dataType: "text", async: false})
		)

		return modules

	parseModule: (classListHTML) =>
		actual = new Module()

		actual.name = $(classListHTML).find("div#content_mit_menu p b").text()
		rows = $(classListHTML).find("table").find("tr")

		rows.each((index, element) =>
			actual.registrations.push(@parseRegistration(element)) if @containsRegistration(index, element, rows)
		);

		registration = new Registration()
		registration = @searcher.getMyRegistration(@myself, actual)

		if(registration)
			actual.position = registration.position
			actual.amIRegistered = registration.isRegistered

		return actual

	containsRegistration: (index, tableRow, array) =>
		return ($(tableRow).children().length != 0 & index != 0) 

	parseRegistration: (tableRow, collection) =>
		children = $(tableRow).children()

		cur = new Registration()
		cur.position = parseInt($(children[0]).text())
		cur.prename = $(children[1]).text().trim()
		cur.name = $(children[2]).text().trim()
		cur.points = parseInt($(children[4]).text())
		cur.isRegistered = $(children[5]).text().trim() == @TEMP_REGISTERED
		cur.classe = $(children[3]).text().trim()
		
		return cur

root = exports ? this
root.Parser = Parser


