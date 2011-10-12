var Registration = function() {
        this.prename = "";
        this.name = "";
        this.classe = "";
        this.position = 0;
        this.isRegistered = false;
        this.points = 0;
};

var Module = function() {
        this.name = "";
        this.shortname = "";
		this.position = 0;
        this.registrations = [];
        this.amIRegistered = false;
};
