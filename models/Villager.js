/* globals require, global, module */

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const addArticle = str => (/[aeiou]/.test(str[0]) ? 'an ' : 'a ') + str;
const requiredFieldError = field => `Villagers are required to have ${addArticle(field[0])} field`;

const villagerSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: requiredFieldError`name`
  },
  birthday: {
    type: String,
    trim: true
  },
  region: {
    type: String,
    trim: true,
    required: requiredFieldError`region`
  },
  address: {
    type: String,
    trim: true
  },
  // friends: {
  //   type: [
  //     { type: mongoose.Schema.ObjectId, ref: 'Villager' }
  //   ],
  //   required: requiredFieldError`friends`
  // },
  single: {
    type: Boolean,
    required: requiredFieldError`single`
  },
  // friendship: {
  //   type: Object
  // }
});

// Define indexes
villagerSchema.index({
  name: 'text'
});

module.exports = mongoose.model('Villager', villagerSchema);