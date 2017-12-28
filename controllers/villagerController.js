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

const getVillagerByName = async name => {
  // Below line can be used for sorting if partial matching ever becomes a thing
  // Use scoreOpt as second arg on `find` and as first arg on `sort` (chained)
  // const scoreOpt = { score: { $meta: 'textScore' } };
  const getAll = name === 'all';
  const query = getAll ? {} : { $text: { $search: name } };
  const sortOpt = getAll ? { name: 1 } : {};
  return await Villager.find(query).sort(sortOpt);
};
exports.getVillagerByName = getVillagerByName;

exports.searchVillagersRoute = async (req,res) => {
  const villagers = await getVillagerByName(req.params.name);
  res.json(villagers[0] || null);
};