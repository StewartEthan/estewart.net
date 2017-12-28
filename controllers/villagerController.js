/* globals require, exports */

const mongoose = require('mongoose');
const Villager = mongoose.model('Villager');

exports.createVillager = async (req,res) => {
  const villager = new Villager(req.body);
  await villager.save();
  res.send(201);
};

exports.getAllVillagers = async (req,res) => {
  const villagers = await Villager.find({}).sort({ name: 1 });
  res.json(villagers);
};

exports.searchVillagers = async (req,res) => {
  const query = { $text: { $search: req.params.name } };
  // Below line can be used for sorting if partial matching ever becomes a thing
  // Use scoreOpt as second arg on `find` and as first arg on `sort` (chained)
  // const scoreOpt = { score: { $meta: 'textScore' } };
  const villagers = await Villager.find(query);
  res.json(villagers[0] || null);
};