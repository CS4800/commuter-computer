const express = require('express'); // server connection
const mongoose = require('mongoose'); // mongodb connection
const bodyParser = require('body-parser'); // parses post requests
const path = require('path'); // server path
const comCalc = require('./routes/api/com-calc'); // commuter calculator

// Download Zillow rent csv files and get latest rent
const zillowRent = require('./routes/api/zillow-rent'); // zillow rent data
zillowRent().then(r => console.log('Zillow rent data\n', r));

// mongodb connection
const db = require('./config/keys').mongoURI;
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(`MongoDB connection fail: ${err}`));

// server app
const app = express();

// bodyParser middleware - require to parse post parameter requests
app.use(bodyParser.json());

// commuter calculator api
app.use('/api/com-calc', comCalc);

// serve static files from the build folder
app.use(express.static(path.join(__dirname, 'client/build')));

// serve all client routes to React's entry point
app.get(['/', '/about'], (req, res) =>
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}...`));

/*******************************************************************************
 * Assignment code blow
 ******************************************************************************/
const axios = require('axios'); // ajax calls
const cheerio = require('cheerio'); // web scraper
const moment = require('moment'); // datetime
const users = require('./routes/api/users'); // users api
// we currently do not have an api key yet, and we probably shouldn't hard code itanyway
const googleMapsClient = require('@google/maps').createClient({
  key: 'your API key here'
});

// http users api for assignment 3
app.use('/api/users', users);

// Cheerio api
// mockup for scraping webpages for data
html_data = '<html><head><title>Mockup data for title</title></head></html>';
const $ = cheerio.load(html_data);
console.log('This is the title from raw html:', $('title').text());

// Moment api
var date = new Date();
var time = moment(date).format();
console.log('Current time is', time);

// Axios example of HTTP Calls with cheerio scraping
axios.get('http://google.com').then(res => {
  const $ = cheerio.load(res.data);
  console.log('Cheerio scraping with axios:', $('title').text());
});
