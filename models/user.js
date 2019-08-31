const mongoose = require('mongoose');
const db = require('../db');

const wishSchema = new mongoose.Schema({
  link: String,
  title: String,
})

const userSchema = new mongoose.Schema({
  name: String,
  slackUserId: String,
  channel: String,
  birthDate: Date,
  wishes: [wishSchema]
});

const User = db.model('User', userSchema);

module.exports = User;
