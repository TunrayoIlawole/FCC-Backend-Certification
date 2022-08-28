// index.js
// where your node app starts

// init project
require('dotenv').config();
const { networkInterfaces } = require('os');
const parser = require('ua-parser-js');
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

const getIp = () => {
  const nets = networkInterfaces();
  const results = Object.create(null);

  for (let name of Object.keys(nets)) {
    for (let net of nets[name]) {
      const familyV4Value = typeof net.family === 'string' ? 'IPV4' : 4;

      if (net.family = familyV4Value && !net.internal) {
        if (!results[name]) {
          results[name] = [];
        }

        results[name].push(net.address)
      }
    }
  }
  return results.en0[1];
}

app.get('/api/whoami', function(req, res) {
  let software = parser(req.get('user-agent'));

  const headerObject = {
    "ipaddress": getIp(),
    "language": req.headers['accept-language'],
    "software": software.ua
  }
  res.json(headerObject);
})

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
