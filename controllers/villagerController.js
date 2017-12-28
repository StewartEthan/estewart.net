/* globals require, exports */

const mongoose = require('mongoose');
const Villager = mongoose.model('Villager');

exports.createVillager = async (req,res) => {
  const villager = new Villager(req.body);
  await villager.save();
  res.send(201)
};