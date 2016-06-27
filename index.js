var express = require('express');
var app = express();
var config = require('./config');
var request = require('request');
var googleAPI = config.googleAPI;
var searchID = config.searchID;

app.get('/search/:search', function(req, res) {
    var search = req.params.search;
    var offset = req.query.offset;
    var url = 'https://www.googleapis.com/customsearch/v1?q=' + search + '&cx=' + searchID + '&key=' + googleAPI;
    if (offset) {
        url += '&start=' + offset;
    }
    request(url, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var items = JSON.parse(body).items;
            var results = [];
            if (!items) {
                res.send("No results")
            } else {
                items.forEach(function(item) {
                    var result = {
                        url: item.link,
                        snippet: item.snippet,
                        context: item.displayLink
                    };
                    results.push(result);
                })
                res.send(
                    results
                );
            }
        };
    });
});

var port = process.env.PORT || 8000;
app.listen(port);
console.log('server listening on port', port, '...');
