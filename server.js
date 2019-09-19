const express = require('express'); // server connection
const mongoose = require('mongoose'); // mongodb connection
const bodyParser = require('body-parser'); // parses post requests
const defaultApi = require('./routes/api/calc'); // example api

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
app.use('/api/calc', defaultApi);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}...`));
