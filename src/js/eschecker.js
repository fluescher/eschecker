(function() {
  var Configuration;
  Configuration = (function() {
    function Configuration() {}
    Configuration.prototype.getUrl = function() {
      return localStorage["url"];
    };
    Configuration.prototype.setInterval = function(interval) {
      return localStorage["interval"] = interval;
    };
    Configuration.prototype.setURL = function(url) {
      return localStorage["url"] = url;
    };
    return Configuration;
  })();
}).call(this);
(function() {
  var Configuration, Parser;
  Configuration = (function() {
    function Configuration() {}
    Configuration.prototype.getUrl = function() {
      return localStorage["url"];
    };
    Configuration.prototype.setInterval = function(interval) {
      return localStorage["interval"] = interval;
    };
    Configuration.prototype.setURL = function(url) {
      return localStorage["url"] = url;
    };
    return Configuration;
  })();
  Parser = (function() {
    Parser.TEMP_REGISTERED = "provisorisch eingeschrieben";
    Parser.prototype.myself = {
      name: "",
      prename: ""
    };
    Parser.prototype.baseUrl = "";
    Parser.prototype.self = Parser;
    function Parser(base) {
      this.baseUrl = base;
    }
    Parser.prototype.getName = function() {
      var nameParts;
      nameParts = $(overviewHTML).find("div#Menu_Titel").text().trim().split(" ");
      this.myself.prename = nameParts[0];
      this.myself.name = nameParts[1];
      return myself;
    };
    Parser.prototype.getModules = function(overviewHTML) {
      var moduleTables, modules;
      self.getName(overviewHTML);
      modules = [];
      moduleTables = $(overviewHTML).find("table");
      moduleTables = moduleTables.filter(function(index, element, array) {
        return index !== 0;
      });
      moduleTables.each(function(index, element) {
        var acturl;
        acturl = $(element).find("tr td a").last().attr("href");
        return $.ajax({
          url: self.baseUrl + "/" + acturl,
          success: function(data) {
            return modules.push(self.parseModule(data));
          },
          dataType: "text",
          async: false
        });
      });
      return modules;
    };
    Parser.prototype.parseModule = function(classListHTML) {
      var actual, registration, rows;
      actual = new Module();
      actual.name = $(classListHTML).find("div#content_mit_menu p b").text();
      rows = $(classListHTML).find("table").find("tr");
      rows.each(function(index, element) {
        if (self.containsRegistration(index, element, rows)) {
          return actual.registrations.push(self.parseRegistration(element));
        }
      });
      registration = new Registration();
      registration = self.searcher.getMyRegistration(self.myself, actual);
      if (registration) {
        actual.position = registration.position;
        actual.amIRegistered = registration.isRegistered;
      }
      return actual;
    };
    Parser.prototype.containsRegistration = function(index, tableRow, array) {
      return $(tableRow).children().length !== 0 & index !== 0;
    };
    Parser.prototype.parseRegistration = function(tableRow, collection) {
      var children, cur;
      children = $(tableRow).children();
      cur = new Registration();
      cur.position = parseInt($(children[0]).text());
      cur.prename = $(children[1]).text().trim();
      cur.name = $(children[2]).text().trim();
      cur.points = parseInt($(children[4]).text());
      cur.isRegistered = $(children[5]).text().trim() === TEMP_REGISTERED;
      cur.classe = $(children[3]).text().trim();
      return cur;
    };
    return Parser;
  })();
}).call(this);
(function() {
  var Configuration, Module, Parser, Registration;
  Configuration = (function() {
    function Configuration() {}
    Configuration.prototype.getUrl = function() {
      return localStorage["url"];
    };
    Configuration.prototype.setInterval = function(interval) {
      return localStorage["interval"] = interval;
    };
    Configuration.prototype.setURL = function(url) {
      return localStorage["url"] = url;
    };
    return Configuration;
  })();
  Registration = (function() {
    function Registration() {}
    Registration.prototype.prename = "";
    Registration.prototype.name = "";
    Registration.prototype.classe = "";
    Registration.prototype.position = 0;
    Registration.prototype.isRegistered = false;
    Registration.prototype.points = 0;
    return Registration;
  })();
  Module = (function() {
    function Module() {}
    Module.prototype.name = "";
    Module.prototype.shortname = "";
    Module.prototype.position = 0;
    Module.prototype.registrations = [];
    Module.prototype.amIRegistered = false;
    return Module;
  })();
  Parser = (function() {
    Parser.TEMP_REGISTERED = "provisorisch eingeschrieben";
    Parser.prototype.myself = {
      name: "",
      prename: ""
    };
    Parser.prototype.baseUrl = "";
    Parser.prototype.self = Parser;
    function Parser(base) {
      this.baseUrl = base;
    }
    Parser.prototype.getName = function() {
      var nameParts;
      nameParts = $(overviewHTML).find("div#Menu_Titel").text().trim().split(" ");
      this.myself.prename = nameParts[0];
      this.myself.name = nameParts[1];
      return myself;
    };
    Parser.prototype.getModules = function(overviewHTML) {
      var moduleTables, modules;
      self.getName(overviewHTML);
      modules = [];
      moduleTables = $(overviewHTML).find("table");
      moduleTables = moduleTables.filter(function(index, element, array) {
        return index !== 0;
      });
      moduleTables.each(function(index, element) {
        var acturl;
        acturl = $(element).find("tr td a").last().attr("href");
        return $.ajax({
          url: self.baseUrl + "/" + acturl,
          success: function(data) {
            return modules.push(self.parseModule(data));
          },
          dataType: "text",
          async: false
        });
      });
      return modules;
    };
    Parser.prototype.parseModule = function(classListHTML) {
      var actual, registration, rows;
      actual = new Module();
      actual.name = $(classListHTML).find("div#content_mit_menu p b").text();
      rows = $(classListHTML).find("table").find("tr");
      rows.each(function(index, element) {
        if (self.containsRegistration(index, element, rows)) {
          return actual.registrations.push(self.parseRegistration(element));
        }
      });
      registration = new Registration();
      registration = self.searcher.getMyRegistration(self.myself, actual);
      if (registration) {
        actual.position = registration.position;
        actual.amIRegistered = registration.isRegistered;
      }
      return actual;
    };
    Parser.prototype.containsRegistration = function(index, tableRow, array) {
      return $(tableRow).children().length !== 0 & index !== 0;
    };
    Parser.prototype.parseRegistration = function(tableRow, collection) {
      var children, cur;
      children = $(tableRow).children();
      cur = new Registration();
      cur.position = parseInt($(children[0]).text());
      cur.prename = $(children[1]).text().trim();
      cur.name = $(children[2]).text().trim();
      cur.points = parseInt($(children[4]).text());
      cur.isRegistered = $(children[5]).text().trim() === TEMP_REGISTERED;
      cur.classe = $(children[3]).text().trim();
      return cur;
    };
    return Parser;
  })();
}).call(this);
