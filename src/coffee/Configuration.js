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
