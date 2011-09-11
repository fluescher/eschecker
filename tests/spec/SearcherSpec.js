describe("Searcher", function() {
    var searcher;
	var module;

    beforeEach(function() {
        searcher = new Searcher();
        modules = [];
        
        var reg1 = new Registration();
        reg1.name=unescape("L%FCscher");
        reg1.prename="Florian";
        reg1.isRegistered = true;
        
        var reg2 = new Registration();
        reg2.name=unescape("Godo");
        reg2.prename="BlaBlu";
        reg2.isRegistered = false;
        
        var mod = new Module();
        mod.name ="test";
        
        mod.registrations.push(reg1);
        mod.registrations.push(reg2);
        
        module = mod;
    });
    
    describe("isRegistered", function() {
        it("should return true if user is registered", function() {
            expect(searcher.isRegistered({name: unescape("L%FCscher"), prename:"Florian"}, module)).toEqual(true);
        });
        
        it("should return false if user is not registered", function() {
			expect(searcher.isRegistered({name: "Godo", prename:"BlaBlu"}, modules)).toEqual(false);
        });

    });
});
