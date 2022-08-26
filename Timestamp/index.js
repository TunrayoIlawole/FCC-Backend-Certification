// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

const isDate = (date) => {
  return (new Date(date) !== "Invalid Date") && !isNaN(new Date(date));
}

const formatDate = (date) => {
  let timeStamp;
  let utcStuff;
  let isValid;

  if (`${date}`.includes('-')) {
    date = `${date}`;
    timeStamp = new Date(date).getTime();
    utcStuff = new Date(date).toUTCString();
    isValid = isDate(date);
  } 
  else if (/^\d+$/.test(date)) {
    timeStamp = new Date(parseInt(date, 10)).getTime();
    utcStuff = new Date(parseInt(date, 10)).toUTCString();
    isValid = isDate(parseInt(date, 10));
  }
  else {
    timeStamp = new Date(date).getTime();
    utcStuff = new Date(date).toUTCString();
    isValid = isDate(date);
  }
  console.log([timeStamp, utcStuff, isValid])
  return [timeStamp, utcStuff, isValid];
}

app.get("/api/", function(req, res) {
  const dattee = new Date();
  res.json({
    "unix": formatDate(dattee.getTime())[0],
    "utc": formatDate(dattee.getTime())[0]
  })
})

app.get("/api/:date?", function(req, res) {
  const date = req.params.date;

  if (!(formatDate(date)[2])) {
    res.json({ error: "Invalid Date"});
  }
  else {
    res.json({
      "unix": formatDate(date)[0],
      "utc": formatDate(date)[1]
    })
  }
})



// listen for requests :)
var listener = app.listen(3400, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
