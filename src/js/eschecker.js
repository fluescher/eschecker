(function() {
  var Configuration, ESChecker, Module, ModuleList, ModuleView, Parser, Registration, Searcher, root,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Registration = (function() {

    function Registration() {}

    Registration.prototype.prename = "";

    Registration.prototype.name = "";

    Registration.prototype.classe = "";

    Registration.prototype.position = 0;

    Registration.prototype.isRegistered = false;

    Registration.prototype.points = 0;

    Registration.prototype.itsMe = false;

    return Registration;

  })();

  Module = (function() {

    Module.prototype.name = "";

    Module.prototype.maxregistrations = 0;

    Module.prototype.shortname = "";

    Module.prototype.position = 0;

    Module.prototype.registrations = [];

    Module.prototype.amIRegistered = false;

    function Module() {
      this.registrations = [];
    }

    Module.prototype.getmaxregistrations = function() {
      this.maxregistrations = this.name.match(/\/\s\d+\s/).toString();
      this.maxregistrations = this.maxregistrations.substring(2);
      return this.maxregistrations = this.maxregistrations.trim();
    };

    return Module;

  })();

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  root.Registration = Registration;

  root.Module = Module;

  Searcher = (function() {

    function Searcher() {
      this.getMyRegistration = __bind(this.getMyRegistration, this);
      this.getUnregisteredCount = __bind(this.getUnregisteredCount, this);
    }

    Searcher.prototype.getUnregisteredCount = function(modules) {
      var cnt, mod, _i, _len;
      cnt = 0;
      for (_i = 0, _len = modules.length; _i < _len; _i++) {
        mod = modules[_i];
        if (!mod.amIRegistered) cnt++;
      }
      return cnt;
    };

    Searcher.prototype.getMyRegistration = function(name, module) {
      var reg, registration, _i, _len, _ref;
      registration = new Registration();
      if (module.registrations) {
        _ref = module.registrations;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          reg = _ref[_i];
          if (reg.name === name.name && reg.prename === name.prename) return reg;
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

    Configuration.DEFAULT_URL = "https://es.fhnw.ch/node/";

    Configuration.DEFAULT_INTERVAL = 300000;

    Configuration.prototype.getUrl = function() {
      if (localStorage.getItem("url") === null) {
        localStorage["url"] = Configuration.DEFAULT_URL;
      }
      return localStorage["url"];
    };

    Configuration.prototype.getInterval = function() {
      if (localStorage.getItem("interval") === null) {
        localStorage["interval"] = Configuration.DEFAULT_INTERVAL;
      }
      return localStorage["interval"];
    };

    Configuration.prototype.setInterval = function(interval) {
      return localStorage["interval"] = interval;
    };

    Configuration.prototype.setUrl = function(url) {
      return localStorage["url"] = url;
    };

    return Configuration;

  })();

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  root.Configuration = Configuration;

  Parser = (function() {

    Parser.prototype.TEMP_REGISTERED = "provisorisch eingeschrieben";

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
      var moduleTables, modules,
        _this = this;
      this.getName(overviewHTML);
      modules = [];
      moduleTables = $(overviewHTML).find("table");
      moduleTables = moduleTables.filter(function(index, element, array) {
        return index !== 0;
      });
      moduleTables.each(function(index, element) {
        var acturl;
        acturl = $(element).find("tr td a").last().attr("href");
        return $.ajax({
          url: _this.baseUrl + "/" + acturl,
          success: function(data) {
            return modules.push(_this.parseModule(data));
          },
          dataType: "text",
          async: false
        });
      });
      return modules;
    };

    Parser.prototype.parseModule = function(classListHTML) {
      var actual, registration, rows,
        _this = this;
      actual = new Module();
      actual.name = $(classListHTML).find("div#content_mit_menu p b").text();
      actual.getmaxregistrations();
      rows = $(classListHTML).find("table").find("tr");
      rows.each(function(index, element) {
        if (_this.containsRegistration(index, element, rows)) {
          return actual.registrations.push(_this.parseRegistration(element));
        }
      });
      registration = new Registration();
      registration = this.searcher.getMyRegistration(this.myself, actual);
      registration.itsMe = true;
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

  ModuleView = (function() {

    ModuleView.prototype.module = null;

    ModuleView.prototype.node = null;

    ModuleView.prototype.detail_node = null;

    ModuleView.prototype.MAX_TITLE_LENGTH = 40;

    function ModuleView(modul) {
      this.toggleDetailView = __bind(this.toggleDetailView, this);      this.module = modul;
    }

    ModuleView.prototype.toggleDetailView = function() {
      return $(this.detail_node).slideToggle();
    };

    ModuleView.prototype.getReadableTitle = function(title) {
      if (title.length > this.MAX_TITLE_LENGTH) {
        return title.substring(0, this.MAX_TITLE_LENGTH) + "...";
      } else {
        return title;
      }
    };

    ModuleView.prototype.getNode = function() {
      var node, registration, title;
      if (this.detail_node === null) {
        node = document.createElement('div');
        node.setAttribute('class', 'module');
        title = document.createElement('div');
        $(title).addClass('title');
        title.innerHTML = this.getReadableTitle(this.module.name);
        registration = document.createElement('div');
        registration.innerHTML = this.module.position + " / " + this.module.maxregistrations;
        $(registration).addClass('registrationCount');
        if (this.module.amIRegistered) {
          $(registration).addClass('green');
        } else {
          $(registration).addClass('red');
        }
        title.appendChild(registration);
        this.detail_node = this.getDetailNode();
        node.onclick = this.toggleDetailView;
        node.appendChild(title);
        node.appendChild(this.detail_node);
        this.node = node;
      }
      return node;
    };

    ModuleView.prototype.getDetailNode = function() {
      var data, detail, index, reg, regist, table, _i, _len, _ref;
      detail = document.createElement('div');
      table = document.createElement('table');
      table.setAttribute('class', 'module');
      table.appendChild(this.getHeader());
      detail.style.display = "none";
      index = 0;
      _ref = this.module.registrations;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        regist = _ref[_i];
        index = index + 1;
        reg = document.createElement('tr');
        if (regist.itsMe) reg.setAttribute('class', 'me');
        data = document.createElement('td');
        data.innerHTML = index;
        data.setAttribute('class', 'nr');
        reg.appendChild(data);
        data = document.createElement('td');
        data.innerHTML = regist.prename + ' ' + regist.name;
        data.setAttribute('class', 'name');
        reg.appendChild(data);
        data = document.createElement('td');
        data.innerHTML = regist.points;
        data.setAttribute('class', 'points');
        reg.appendChild(data);
        table.appendChild(reg);
      }
      detail.appendChild(table);
      return detail;
    };

    ModuleView.prototype.getHeader = function() {
      var h1, h2, h3, header;
      header = document.createElement('tr');
      h1 = document.createElement('th');
      h1.innerHTML = '#';
      h1.setAttribute('class', 'nr');
      h2 = document.createElement('th');
      h2.innerHTML = 'Name';
      h2.setAttribute('class', 'name');
      h3 = document.createElement('th');
      h3.innerHTML = 'Punkte';
      h3.setAttribute('class', 'points');
      header.appendChild(h1);
      header.appendChild(h2);
      header.appendChild(h3);
      return header;
    };

    return ModuleView;

  })();

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  root.ModuleView = ModuleView;

  ESChecker = (function() {

    function ESChecker(config) {
      this.config = config;
      this.startChecking = __bind(this.startChecking, this);
      this.check = __bind(this.check, this);
      this.getOverviewHtml = __bind(this.getOverviewHtml, this);
      this.parser = new Parser(this.config.getUrl());
      this.searcher = new Searcher();
      this.modules = false;
    }

    ESChecker.prototype.getModules = function() {
      return this.modules;
    };

    ESChecker.prototype.getOverviewHtml = function() {
      var hadError, html,
        _this = this;
      hadError = false;
      html = "";
      $.ajax({
        url: this.config.getUrl() + "/36",
        success: function(data) {
          return html = data;
        },
        error: function(data) {
          return hadError = true;
        },
        dataType: "text",
        async: false
      });
      if (hadError === true) return false;
      return html;
    };

    ESChecker.prototype.check = function() {
      var cnt, data;
      this.isConnected = true;
      this.modules = new Array();
      cnt = 0;
      data = this.getOverviewHtml();
      if (data === false) {
        this.modules = false;
        return;
      }
      this.modules = this.parser.getModules(data);
      if (this.modules !== false) {
        cnt = this.searcher.getUnregisteredCount(this.modules);
      }
      if (cnt > 0) {
        chrome.browserAction.setBadgeBackgroundColor({
          color: [255, 0, 0, 255]
        });
        chrome.browserAction.setBadgeText({
          text: '' + cnt
        });
      } else {
        chrome.browserAction.setBadgeText({
          text: ""
        });
      }
      return this.onupdate();
    };

    ESChecker.prototype.startChecking = function() {
      this.check();
      return setInterval(this.check, this.config.getInterval());
    };

    ESChecker.prototype.onupdate = function() {};

    return ESChecker;

  })();

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  root.ESChecker = ESChecker;

  ModuleList = (function() {

    function ModuleList() {
      this.clearView = __bind(this.clearView, this);
      this.showModules = __bind(this.showModules, this);
      this.initView = __bind(this.initView, this);
      this.onupdate = __bind(this.onupdate, this);
      this.showMessage = __bind(this.showMessage, this);      this.bg = chrome.extension.getBackgroundPage();
    }

    ModuleList.prototype.showMessage = function(message) {
      var box;
      box = document.createElement('div');
      box.innerHTML = message;
      box.setAttribute('class', 'message');
      return document.body.appendChild(box);
    };

    ModuleList.prototype.onupdate = function() {
      if (this.bg.checker.getModules()) {
        return this.showModules(this.bg.checker.getModules());
      } else {
        return this.showMessage("Auf das System kann nicht zugegriffen werden.");
      }
    };

    ModuleList.prototype.initView = function() {
      return this.bg.checker.onupdate = this.onupdate;
    };

    ModuleList.prototype.showModules = function(modules) {
      var mod, _i, _len, _results;
      this.clearView();
      _results = [];
      for (_i = 0, _len = modules.length; _i < _len; _i++) {
        mod = modules[_i];
        _results.push(document.body.appendChild(new ModuleView(mod).getNode()));
      }
      return _results;
    };

    ModuleList.prototype.clearView = function() {
      var node, _results;
      node = document.body;
      if (node.hasChildNodes()) {
        _results = [];
        while (node.childNodes.length >= 1) {
          _results.push(node.removeChild(node.firstChild));
        }
        return _results;
      }
    };

    return ModuleList;

  })();

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  root.ModuleList = ModuleList;

}).call(this);
