var express = require('express');
var app = express();

app.get('/search/:query', function(req, res) {
    var query = req.params.query;
    res.send(JSON.stringify({
        query: query
    }))
});

var port = process.env.PORT || 8000;
app.listen(port);
console.log('server listening on port', port, '...');
