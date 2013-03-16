node-google-feed-api
====================

This node module is a minimal implementation of the [Google Feed API](https://developers.google.com/feed/). Method names and usage are almost the same as the Google Feed API, although there has been added som additional methods to ease retrieval of items from feeds.

Usage
-----
Create an instance:

    var gfeed = require('google-feed-api');

### Loading feeds

Construct a Feed-object from an URL:

    var feed = new gfeed.Feed('http://politiken.dk/rss/senestenyt.rss');
    
Use one of the methods `.load(callback), .includeHistoricalEntries(), .setNumEntries(num), .setResultFormat(format)` documented at [Google Feed API](https://developers.google.com/feed/v1/reference#feed) or use one of the following additional methods:
    
#### Listing items of a feed

    feed.listItems(callback(items)); // returns an array of items
    
### Finding feeds

Raw output:

    gfeed.findFeeds('Politiken', callback(result)); // JSON object
    
List output:
    
    gfeed.listFeeds('Politiken', callback(items)); // array
    
