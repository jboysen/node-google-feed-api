var request = require('request')

exports.Feed = function(url) {

  var loadResult = null;

  this.JSON_FORMAT = 'json';
  this.XML_FORMAT = 'xml';

  this.opts = {
    v:"1.0",
    output:this.JSON_FORMAT,
    q:url
  };

  this.setNumEntries = function (numEntries) {
    this.opts.num = numEntries;
  };

  this.includeHistoricalEntries = function () {
    this.opts.scoring = 'h';
  };

  this.setResultFormat = function (format) {
    this.opts.output = format;
  };

  this.load = function (callback) {
    
    request({url: 'https://ajax.googleapis.com/ajax/services/feed/load', qs: this.opts}, function (err, res, body) {
      if (err) return callback(err);

      var data = JSON.parse(body);

      if (data.responseDetails == 'Feed could not be loaded.') return callback(data.responseDetails);

      loadResult = data && data.responseData;

      return callback(data && data.responseData);
    });

  };

  this.listItems = function (callback) {
    function parseResult(result) {
      var items = (loadResult && loadResult.feed && loadResult.feed.entries) || [];
      return callback(items);
    };

    if (loadResult === null) {
      // reset format
      var oldFormat = this.opts.output;
      this.opts.output = this.JSON_FORMAT;
      this.load(function () {
        parseResult();
      });
      // set format back
      this.opts.output = oldFormat;
    } else {
      parseResult();
    }
  };

  return this;
};

exports.findFeeds = function (query, callback) {
  
  var opts = {
    v:"1.0",
    q:query
  }

  request({url: 'https://ajax.googleapis.com/ajax/services/feed/find', qs: opts}, function (err, res, body) {
    if (err) return callback(err);

    var data = JSON.parse(body);
    
    return callback(data && data.responseData);
  });
};

exports.listFeeds = function (query, callback) {
    this.findFeeds(query, function (result) {
      return callback (result.entries || []);
    });
};