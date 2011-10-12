
var Parser = function(base) {
    var TEMP_REGISTERED = "provisorisch eingeschrieben";
	var self = this;
	self.searcher = new Searcher();
	self.baseUrl = base;
	self.myself = { 
            "name": "",
            "prename": ""
        };;

    this.getName = function(overviewHTML) {
        var nameParts = $(overviewHTML).find("div#Menu_Titel").text().trim().split(" ");

        self.myself.prename = nameParts[0];
        self.myself.name = nameParts[1];

        return self.myself;
    }
	
    this.getModules = function (overviewHTML) {
    	self.getName(overviewHTML);
        var modules = [];

        var moduleTables = $(overviewHTML).find("table");
        moduleTables = moduleTables.filter(function(index, element, array) { return (index != 0); });

        moduleTables.each(function(index, element) {
            var acturl = $(element).find("tr td a").last().attr("href");

            $.ajax({
                url: self.baseUrl + "/" + acturl,
                success: function(data) { 
                    modules.push(self.parseModule(data));
                },
                dataType: "text",
                async: false});
        });

        return modules;
    }

    this.parseModule = function(classListHTML) {
        var actual = new Module();
       
        actual.name = $(classListHTML).find("div#content_mit_menu p b").text();
        var rows = $(classListHTML).find("table").find("tr");

        rows.each(function(index, element) {
            if (self.containsRegistration(index, element, rows)) {
            	actual.registrations.push(self.parseRegistration(element));
            }
        });

		var registration = new Registration();
		registration = self.searcher.getMyRegistration(self.myself, actual);
		
		if(registration){
			actual.position = registration.position;
			
			if(registration.isRegistered)
				actual.amIRegistered = true;
		}
			
        return actual;
    }
    
    this.containsRegistration = function(index, tableRow, array) {
    	return ($(tableRow).children().length != 0 & index != 0)    	
    }
    
    this.parseRegistration = function(tableRow, collection) {
    	var children = $(tableRow).children();

    	var cur = new Registration();
    	cur.position = parseInt($(children[0]).text());
    	cur.prename = $(children[1]).text().trim();
    	cur.name = $(children[2]).text().trim();
        cur.points = parseInt($(children[4]).text());
    	cur.isRegistered = $(children[5]).text().trim() === TEMP_REGISTERED;
        cur.classe = $(children[3]).text().trim();

    	return cur;
    }
    
}
