const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Person = new Schema({
  name: {
    required: true,
    type: String,
  },
});

const personSchema = mongoose.model('Person', Person);

module.exports = personSchema;
