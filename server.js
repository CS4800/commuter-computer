const express = require('express'); // server connection
const mongoose = require('mongoose'); // mongodb connection
const bodyParser = require('body-parser'); // parses post requests
const path = require('path'); // server path
const service = require('./providers/service'); // comCalc setup
const ccRoute = require('./routes/api/comCalcRoute'); // commuter calc routing
const mongoRoute = require('./routes/api/mongoRoute'); // mongodb routes

// mongodb settings
const db = require('./config/keys').mongoURI;
const dbOptions = {
  autoReconnect: true,
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  reconnectInterval: 1000, // Reconnect every 1 second
  poolSize: 10, // Maintain up to 10 socket connections
  connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity,

  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
};

// mongodb connections
mongoose.connection.on('connecting', () => console.log('Mongo connecting...'));
mongoose.connection.on('connected', () => console.log('Mongo connected'));
mongoose.connection.on('disconnected', () => console.log('Mongo disconnected'));
mongoose.connection.on('reconnected', () => console.log('Mongo reconnected'));
mongoose.connection.on('error', e => console.log(`Mongo error: ${e}`));
mongoose.connect(db, dbOptions);

// server app
const app = express();

// bodyParser middleware - require to parse post parameter requests
app.use(bodyParser.json());

// commuter calculator api
app.use('/api/com-calc', ccRoute);

// mongodb api routes
app.use('/api/mongo', mongoRoute);

// serve static files from the build folder
app.use(express.static(path.join(__dirname, 'client/build')));

// serve all client routes to React's entry point
app.get(['/', '/about'], (req, res) =>
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
);

// server service for db seed, scheduling jobs etc
service.run();

const port = process.env.PORT || 5000;
module.exports = app.listen(port, () =>
  console.log(`Server started on port ${port}...`)
);

/*******************************************************************************
 * Assignment code below
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
const htmlTitle = $('title').text();

// Moment api
var date = new Date();
var time = moment(date).format();

// Axios example of HTTP Calls with cheerio scraping
axios.get('http://google.com').then(res => {
  const $ = cheerio.load(res.data);
  const googleTitle = $('title').text();
});

// Unmatched routes - must be last route!
app.use((req, res) =>
  res.status(404).sendFile(path.join(__dirname, 'client/build', 'index.html'))
);
