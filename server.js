// Catches uncaught exceptions and prevents app crashes
process.on('uncaughtException', function (err) {
  console.error(err.stack || err)
});

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
require('dotenv').config();

const app = express();
const apiRoutes = require('./app/routes/api_routes');

// DB Setup
const db_url = process.env.MONGOLAB_URI || "mongodb://localhost:27017/voting-app-211216";
mongoose.connect(db_url);
const db = mongoose.connection;
db.on('error', (err) => {
  throw new Error(err);
  process.exit(1);
});
db.once('open', () => {
  console.log('Connected to MongoDB server.');
});

// App Setup
// HTTP request logger with Standard Apache combined log output
app.use(morgan('combined'));
// Enable Cross Origin Resource Sharing
app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));
// Helmet is a collection of 11 smaller middleware functions
// that set HTTP headers to secure Express apps
app.use(helmet());

app.use('/api', apiRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
