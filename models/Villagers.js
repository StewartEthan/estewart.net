const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const vowels = [ 'a','e','i','o','u' ];
const addArticle = str => (vowels.includes(str[0]) ? 'an ' : 'a ') + str;
const requiredFieldError = field => `Villagers are required to have ${addArticle(field[0])} field`;

const villagerSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: requiredFieldError`name`
  },
  birthday: {
    type: String,
    trim: true,
    required: requiredFieldError`birthday`
  },
  region: {
    type: String,
    trim: true,
    required: requiredFieldError`region`
  },
  address: {
    type: String,
    trim: true,
    required: requiredFieldError`address`
  },
  // friends: {
  //   type: [String],
  //   required: requiredFieldError`friends`
  // },
  // single: {
  //   type: Boolean,
  //   required: requiredFieldError`single`
  // },
  // friendship: {
  //   type: Object,
  //   required: requiredFieldError`friendship`
  // }
});

module.exports = mongoose.model('Villager', villagerSchema);