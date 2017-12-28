/* globals require, exports */

const mongoose = require('mongoose');
const Villager = mongoose.model('Villager');

exports.createVillager = async (req,res) => {
  const villager = new Villager(req.body);
  await villager.save();
  res.sendStatus(201);
};

exports.getAllVillagers = async (req,res) => {
  const villagers = await exports.getVillagerByName('all');
  res.json(villagers);
};

exports.getVillagerByName = async name => {
  // Below line can be used for sorting if partial matching ever becomes a thing
  // Use scoreOpt as second arg on `find` and as first arg on `sort` (chained)
  // const scoreOpt = { score: { $meta: 'textScore' } };
  const getAll = name === 'all';
  const query = getAll ? {} : { $text: { $search: name } };
  const sortOpt = getAll ? { name: 1 } : {};
  return await Villager.find(query).sort(sortOpt);
};

exports.getOneVillager = async (req,res) => {
  const villagers = await exports.getVillagerByName(req.params.name);
  res.json(villagers[0] || null);
};

exports.updateVillager = async (req,res) => {
  const { id } = req.params;
  const newData = { $set: req.body };
  const updated = await Villager.findByIdAndUpdate(id, newData, { new: true });
  res.json(updated);
};

exports.deleteVillager = async (req,res) => {
  await Villager.findByIdAndRemove(req.params.id);
  res.sendStatus(204);
};