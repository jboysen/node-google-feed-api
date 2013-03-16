var assert = require("assert")
  , should = require("should")
  , gfeed = require("../lib/google-feed-api.js")

// test specifics
  , feedUrl = 'http://politiken.dk/rss/senestenyt.rss';


describe('gfeed', function() {

  describe('#findFeeds', function () {
    it('should return an Array of results', function (done) {
      gfeed.findFeeds('Politiken', function(feeds) {
        feeds.should.be.an.instanceOf(Array);
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


    describe('#load', function () {
      var feed = new gfeed.Feed(feedUrl); 

      it('should return an Array', function(done) {
        feed.load(function(items) {
          items.should.be.an.instanceOf(Array);
          done();
        });
      });

      it('should return 4 items', function(done) {
        feed.load(function(items) {
          items.should.have.lengthOf(4);          
          done();
        });
      });


      it('should return 10 items after setNumEntries has been called with arg 10', function(done) {
        feed.includeHistoricalEntries();
        feed.setNumEntries(10);
        feed.load(function(items) {
          items.should.have.lengthOf(10);          
          done();
        });
      });


    });

  });
});