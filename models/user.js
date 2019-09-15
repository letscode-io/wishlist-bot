const mongoose = require('mongoose');
const db = require('../db');

const wishSchema = new mongoose.Schema({
  link: String,
  title: String,
})

const userSchema = new mongoose.Schema({
  birthDate: Date,
  name: String,
  slackImChannel: String,
  slackTeamId: String,
  slackUserId: String,
  wishes: [wishSchema],
  yearOfBirthday: Number
});

const User = db.model('User', userSchema);

module.exports = User;
