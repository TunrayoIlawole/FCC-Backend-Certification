require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require("body-parser");
const dns = require('dns');
const urlParser = require('url');

app.use(bodyParser.urlencoded({ extended: "false" }));

const mongoose = require('mongoose');
const mySecret = process.env['MONGO_URI'];
mongoose.connect(mySecret, { useNewUrlParser: true, useUnifiedTopology: true });


const Schema = mongoose.Schema;

const urlSchema = new Schema({
  url: String,
});

const Url = mongoose.model("Url", urlSchema);


// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.post('/api/shorturl', function(req, res) {
  let url = req.body.url;

  dns.lookup(urlParser.parse(url).hostname, (err, data) => {
    if (!data) {
      res.json({ error: 'invalid url' })
    }
    const newUrl = new Url({url: url})
    newUrl.save((err, data) => {
      if (err) return console.error(err);

      res.json({ original_url : data.url, short_url : data.id })
    })
  })
})

app.get('/api/shorturl/:short_url', function(req, res) {
  const urlId = req.params.short_url;

  Url.findById(urlId, (err, data) => {
    if (err) res.json({ error: 'invalid url' })

    res.redirect(data.url);
  })
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
