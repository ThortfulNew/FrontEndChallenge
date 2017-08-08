var express = require('express')
var compression = require('compression')
var app = express()
var port = process.env.PORT || 3000
var path = require("path")
var fs = require("fs")
var staticRoot = __dirname + '/public/'

app.use(compression());
app.use(express.static(staticRoot));


app.use(function(req, res, next){  
    // if the request is not html then move along
    var accept = req.accepts('html', 'json', 'xml');
    if(accept !== 'html'){
        return next();
    }

    // if the request has a '.' assume that it's for a file, move along
    var ext = path.extname(req.path);
    if (ext !== ''){
        return next();
    }
    fs.createReadStream(staticRoot + 'index.html').pipe(res);
});

app.listen(port, function () {
  console.log('App listening on port', port)
});