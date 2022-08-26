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

const isValidDate = (date) => {
  return !isNaN(Date.parse(date))
}

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
  } else {
    timeStamp = new Date(parseInt(date, 10)).getTime();
    utcStuff = new Date(parseInt(date, 10)).toUTCString();
    isValid = isDate(parseInt(date, 10));
  }
  console.log([timeStamp, utcStuff, isValid])
  return [timeStamp, utcStuff, isValid];
}

app.get("/api/:date?", function(req, res) {
  const date = req.params.date;

  if (!(formatDate(date)[2])) {
    res.json({ error: "Invalid Date "});
  }
  else {
    res.json({
      "unix": !date ? formatDate(new Date().getTime())[0] : formatDate(date)[0],
      "utc": !date ? formatDate(new Date().getTime())[1] : formatDate(date)[1]
    })
  }
})



// listen for requests :)
var listener = app.listen(3400, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
