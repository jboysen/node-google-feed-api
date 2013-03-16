var gfeed = require('./lib/google-feed-api.js')

var feed = gfeed.Feed('http://politiken.dk/');
feed.load(function(items) {

})