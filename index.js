var express = require('express');
var app = express();
var dotenv = require('dotenv');
dotenv.load();
var Bing = require('node-bing-api')({ accKey:process.env.BING_API});
const parseUrl = require('parse-url');

app.set('port', (process.env.PORT || 5000));

app.get('/api/imagesearch/:query', function(request, response) {
  var parsedUrl = parseUrl(request.url);
  var searchQuery = substr_Url(parsedUrl.pathname);
  var offsetVal = substr_Url(parsedUrl.search);
  console.log(searchQuery);
  console.log(offsetVal);

 Bing.images('lolcats', {top : 10}, function(error, res, body){
 if(error){
     response.writeHead(200,{'content-type':'application/json'});
     response.write(JSON.stringify({"error":error}));
     response.end();
   }else{
     response.writeHead(200,{'content-type':'application/json'});
     response.write(JSON.stringify({"data":body.d.results}));
     response.end();
   }
  });
});

function substr_Url(string){
  if(string.charAt(0)=='/'){
    var str = string.substr(17);
    str = str.replace(/(\W[0-9]{2})/g,' '); //replacing %20 space by regexp
    return str;
  }else{
    return string.substr(7);
  }
}

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
