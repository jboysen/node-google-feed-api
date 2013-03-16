var request = require('request')

this.Feed = function(url) {

  this.opts = {
    v:"1.0",
    q:url
  };


  this.setNumEntries = function (numEntries) {
    this.opts.num = numEntries;
  };


  this.includeHistoricalEntries = function () {
    this.opts.scoring = 'h';
  };


  this.load = function (callback) {
    
    request({url: 'https://ajax.googleapis.com/ajax/services/feed/load', qs: this.opts}, function (err, res, body) {
      if (err) return callback(err);

      var data = JSON.parse(body);

      if (data.responseDetails == 'Feed could not be loaded.') return callback(data.responseDetails);
      
      var items = (data && data.responseData && data.responseData.feed && data.responseData.feed.entries) || [];

      return callback(items);
    });

  };


  return this;
};

this.findFeeds = function (query, callback) {
  
  var opts = {
    v:"1.0",
    q:query
  }

  request({url: 'https://ajax.googleapis.com/ajax/services/feed/find', qs: opts}, function (err, res, body) {
    if (err) return callback(err);

    var data = JSON.parse(body);
    
    if (data.responseDetails == 'Feed could not be loaded.') return callback(data.responseDetails);
    
    var feeds = (data && data.responseData && data.responseData.entries) || []
    
    return callback(feeds);
  });
};