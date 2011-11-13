(function() {
  var Configuration, Module, Parser, Registration, Searcher, root;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
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
  root = typeof exports !== "undefined" && exports !== null ? exports : this;
  root.Registration = Registration;
  root.Module = Module;
  Searcher = (function() {
    function Searcher() {
      this.getMyRegistration = __bind(this.getMyRegistration, this);
    }
    Searcher.prototype.getMyRegistration = function(name, module) {
      var reg, registration, _i, _len, _ref;
      registration = new Registration();
      if (module.registrations) {
        _ref = module.registrations;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          reg = _ref[_i];
          if (reg.name === name.name && reg.prename === name.prename) {
            return reg;
          }
        }
      }
      return false;
    };
    return Searcher;
  })();
  root = typeof exports !== "undefined" && exports !== null ? exports : this;
  root.Searcher = Searcher;
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
  root = typeof exports !== "undefined" && exports !== null ? exports : this;
  root.Configuration = Configuration;
  Parser = (function() {
    Parser.TEMP_REGISTERED = "provisorisch eingeschrieben";
    Parser.prototype.myself = {
      name: "",
      prename: ""
    };
    Parser.prototype.baseUrl = "";
    Parser.prototype.searcher = new Searcher();
    function Parser(base) {
      this.parseRegistration = __bind(this.parseRegistration, this);
      this.containsRegistration = __bind(this.containsRegistration, this);
      this.parseModule = __bind(this.parseModule, this);
      this.getModules = __bind(this.getModules, this);
      this.getName = __bind(this.getName, this);      this.baseUrl = base;
    }
    Parser.prototype.getName = function(overviewHTML) {
      var nameParts;
      nameParts = $(overviewHTML).find("div#Menu_Titel").text().trim().split(" ");
      this.myself.prename = nameParts[0];
      this.myself.name = nameParts[1];
      return this.myself;
    };
    Parser.prototype.getModules = function(overviewHTML) {
      var moduleTables, modules;
      this.getName(overviewHTML);
      modules = [];
      moduleTables = $(overviewHTML).find("table");
      moduleTables = moduleTables.filter(function(index, element, array) {
        return index !== 0;
      });
      moduleTables.each(__bind(function(index, element) {
        var acturl;
        acturl = $(element).find("tr td a").last().attr("href");
        return $.ajax({
          url: this.baseUrl + "/" + acturl,
          success: __bind(function(data) {
            return modules.push(this.parseModule(data));
          }, this),
          dataType: "text",
          async: false
        });
      }, this));
      return modules;
    };
    Parser.prototype.parseModule = function(classListHTML) {
      var actual, registration, rows;
      actual = new Module();
      actual.name = $(classListHTML).find("div#content_mit_menu p b").text();
      rows = $(classListHTML).find("table").find("tr");
      rows.each(__bind(function(index, element) {
        if (this.containsRegistration(index, element, rows)) {
          return actual.registrations.push(this.parseRegistration(element));
        }
      }, this));
      registration = new Registration();
      registration = this.searcher.getMyRegistration(this.myself, actual);
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
      cur.isRegistered = $(children[5]).text().trim() === this.TEMP_REGISTERED;
      cur.classe = $(children[3]).text().trim();
      return cur;
    };
    return Parser;
  })();
  root = typeof exports !== "undefined" && exports !== null ? exports : this;
  root.Parser = Parser;
}).call(this);
