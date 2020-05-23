const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const User = new Schema({
  name: {
    type: String,
    default: '',
    required: true,
    trim: true,
    max: 15,
  },
  email: {
    type: String,
    lowercase: true,
    default: '',
    unique: true,
    trim: true,
    required: true,
  },
  pwd: {
    type: String,
    trim: true,
    default: '',
    required: true,
    max: 12,
  },
  pwd2: {
    type: String,
    required: true,
    default: '',
  },

  date: {
    type: Date,
    default: Date.now,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
  },
  bio: {
    type: String,
  },
  pics: {
    type: String,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const userSchema = mongoose.model('User', User);

module.exports = userSchema;
