describe("Parser", function() {
    var parser;
    var testKlassenListe;
    var testOverview;

    beforeEach(function() {
        parser = new Parser();
        $.ajax({url: "data/klassenliste.html", success: function(data) {
            testKlassenListe = data;  
        }, async: false, dataType: "text"});
        $.ajax({url: "data/overview.html", success: function(data) {
            testOverview = data;
        }, async: false, dataType: "text"});
    });
    
    describe("getModules", function() {
        it("should return a list with 11 modules", function() {
            expect(parser.getModules(testOverview).length).toEqual(11);
        });
    });

    
    describe("parseModule", function() {
    	it("should return a list with 36 registrations", function() {
    		expect(parser.parseModule(testKlassenListe).registrations.length).toEqual(36);
    	});
    	
    	it("should return registrations with correct positions", function() {
    		expect(parser.parseModule(testKlassenListe).registrations[0].position).toEqual(1);
    		expect(parser.parseModule(testKlassenListe).registrations[5].position).toEqual(6);
    	});
    	
    	it("should return registrations with correct names", function() {
    		expect(parser.parseModule(testKlassenListe).registrations[0].name).toEqual(unescape("Pl%FCss"));
    		expect(parser.parseModule(testKlassenListe).registrations[5].name).toEqual(unescape("L%FCscher"));
    	});

        it("should return registrations with correct points", function() {
            expect(parser.parseModule(testKlassenListe).registrations[0].points).toEqual(9);
            expect(parser.parseModule(testKlassenListe).registrations[5].points).toEqual(6);
        });

        it("should return registrations with correct registration status", function() {
            expect(parser.parseModule(testKlassenListe).registrations[0].isRegistered).toEqual(true);
            expect(parser.parseModule(testKlassenListe).registrations[32].isRegistered).toEqual(false);
        });

        it("should return registrations with correct classes", function() {
            expect(parser.parseModule(testKlassenListe).registrations[0].classe).toEqual("1-T-B-I/09");
            expect(parser.parseModule(testKlassenListe).registrations[1].classe).toEqual("1-T-B-I/06");
        });
    });


 

});
