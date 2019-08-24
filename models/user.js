const mongoose = require('mongoose');
const db = require('../db');

const userSchema = new mongoose.Schema({
  name: String,
  slackUserId: String,
  channel: String,
  birthDate: Date,
});

const User = db.model('User', userSchema);

module.exports = User;
