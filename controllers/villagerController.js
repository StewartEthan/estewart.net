/* globals require, exports */

const mongoose = require('mongoose');
const Villager = mongoose.model('Villager');

exports.createVillager = async (req,res) => {
  const villager = new Villager(req.body);
  await villager.save();
  res.send(201)
};

exports.getAllVillagers = async (req,res) => {
  const villagers = await Villager.find({});
  res.json(villagers);
};

exports.searchVillagers = async (req,res) => {
  const { name } = req.params;
  const query = {
    $text: { $search: name }
  };
  const scoreOpt = {
    score: { $meta: 'textScore' }
  };
  const villagers = await Villager
    .find(query, scoreOpt)
    .sort(scoreOpt);
  res.json(villagers[0] || null);
};