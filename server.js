const express = require('express'); // server connection
const mongoose = require('mongoose'); // mongodb connection
const bodyParser = require('body-parser'); // parses post requests
const moment = require('moment'); // improves time and date functionality
const axios = require('axios');
const comCalc = require('./routes/api/com-calc'); // example api
const users = require('./routes/api/users');
// we currently do not have an api key yet, and we probably shouldn't hard code itanyway
// const googleMapsClient = require('@google/maps').createClient({
//  key: 'your API key here'
// });

// mongodb connection
const db = require('./config/keys').mongoURI;
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(`MongoDB connection fail: ${err}`));

// server app
const app = express();

// bodyParser middleware
app.use(bodyParser.json());

// use routes
app.use('/api/com-calc', comCalc);

// team members api for assignment 3
app.use('/api/users', users);

var date = new Date();
var time = moment(date).format();
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port} at ${time}...`);

  // Axios example of HTTP Calls
  axios
    .get('http://localhost:5000/routes/api/users')
    .then(res => console.log(res.data));
});
