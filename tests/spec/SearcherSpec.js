describe("Searcher", function() {
    var searcher;
	var module;
	var reg1 = new Registration();

    beforeEach(function() {
        searcher = new Searcher();
        modules = [];
        
        reg1.name=unescape("L%FCscher");
        reg1.prename="Florian";
        reg1.isRegistered = true;
        
        var mod = new Module();
        mod.name ="test";
        
        mod.registrations.push(reg1);
        
        module = mod;
    });
    
    describe("getMyRegistration", function() {
        it("should return the registration if user is registered", function() {
            expect(searcher.getMyRegistration({name: unescape("L%FCscher"), prename:"Florian"}, module)).toEqual(reg1);
        });
        
        it("should return false if no registration for this user could be found", function() {
			expect(searcher.getMyRegistration({name: "asdf", prename:"asdf"}, modules)).toEqual(false);
        });

    });
});
