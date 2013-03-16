var assert = require("assert")
  , should = require("should")
  , gfeed = require("../lib/google-feed-api.js")

// test specifics
  , feedUrl = 'http://politiken.dk/rss/senestenyt.rss';


describe('gfeed', function() {

  describe('#findFeeds', function () {
    it('should return an Object of results', function (done) {
      gfeed.findFeeds('Politiken', function(result) {
        result.should.be.an.instanceOf(Object);
        done();
      });
    });
  });

  describe('#listFeeds', function() {
    it('should return an Array', function (done) {
      gfeed.listFeeds('Politiken', function(result) {
        result.should.be.an.instanceOf(Array);
        done();
      });
    });
  });

  describe('#Feed', function() {
    
    var feed = new gfeed.Feed(feedUrl); 

    it('should return a Feed object', function() {     
      feed.should.be.an.instanceOf(Object);
    });

    describe('#setNumEntries', function() {
      it ('should not return anything', function () {
        if (feed.setNumEntries(10))
          should.fail('should not return anything')
      });

      it ('should be 10 after call', function () {
        feed.opts.num.should.equal(10);
      });

      it ('num should not be set after new instance created', function () {
        var newFeed = new gfeed.Feed(feedUrl);
        newFeed.opts.should.not.have.property('num');
      });
    });

    describe('#includeHistoricalEntries', function () {
      it ('should not return anything', function () {
        if (feed.includeHistoricalEntries())
          should.fail('should not return anything')
      });

      it ('should be set after call', function () {
        feed.opts.scoring.should.equal('h');
      });

      it ('scoring should not be set after new instance created', function () {
        var newFeed = new gfeed.Feed(feedUrl);
        newFeed.opts.should.not.have.property('scoring');
      });
    });

    describe('#setResultFormat', function () {
      it ('should not return anything', function () {
        if (feed.setResultFormat(feed.XML_FORMAT))
          should.fail('should not return anything')
      });

      it ('should be set after call', function () {
        feed.opts.output.should.equal(feed.XML_FORMAT);
      });

      it ('format should be set to JSON after new instance created', function () {
        var newFeed = new gfeed.Feed(feedUrl);
        newFeed.opts.output.should.equal(feed.JSON_FORMAT);
      });
    });


    describe('#load', function () {
      var feed = new gfeed.Feed(feedUrl); 

      it('should return an Object', function(done) {
        feed.load(function(result) {
          result.should.be.an.instanceOf(Object);
          done();
        });
      });

      it('should return an Object with the property feed', function(done) {
        feed.load(function(result) {
          result.should.have.property('feed');
          done();
        });
      });

    });


    describe('#listItems', function () {
      var feed = new gfeed.Feed(feedUrl); 

      it('should return an Array', function(done) {
        feed.listItems(function(items) {
          items.should.be.an.instanceOf(Array);
          done();
        });
      });

    });

  });
});