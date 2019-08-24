const mongoose = require('mongoose');

mongoose.set('debug', true);

mongoose.connect(process.env.MONGO_DB_URL, {
  useNewUrlParser: true
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

module.exports = db;
