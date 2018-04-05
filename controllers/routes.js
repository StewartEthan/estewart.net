/* globals require process module */

// eslint-disable-next-line
const router = require('express').Router();

const { catchErrors } = require('../utility');
const villagerController = require('./villagerController');

// main (root) route
router.get('/', (req,res) => {
  res.render('index');
});

// /apps routes
router.get('/apps', (req,res) => {
  res.render('apps');
});
router.get('/apps/games/:gameName', (req,res) => {
  const { gameName } = req.params;
  const gameTitle = gameName.replace(gameName[0], gameName[0].toUpperCase());
  res.render(`apps/games/canvas`, { gameName, gameTitle });
});
router.get('/apps/:appName', async (req,res,next) => {
  if (/-admin$/.test(req.params.appName)) next(); // Skip any attempts to go directly to admin pages

  const isAdminReq = 'admin' in req.query;
  const { appName } = req.params;
  const file = isAdminReq
    ? `apps/${appName}-admin`
    : `apps/${appName}`;
  const props = {};
  if (appName === 'stardew' && isAdminReq) {
    props.villagers = await villagerController.getVillagerByName('all');
  }
  res.render(file, props);
});

// /stardew routes
router.get('/stardew/villager/all', catchErrors(villagerController.getAllVillagers));
router.get('/stardew/villager/:name', catchErrors(villagerController.getOneVillager));
router.post('/stardew/villager', catchErrors(villagerController.createVillager));
router.put('/stardew/villager/:id', catchErrors(villagerController.updateVillager));
router.delete('/stardew/villager/:id', catchErrors(villagerController.deleteVillager));

// /code routes
router.get('/code', (req,res) => {
  res.render('code');
});

// /blog routes
router.get('/blog', (req,res) => {
  res.render('blog');
});

// /about route
router.get('/about', (req,res) => {
  res.render('about');
});

// One-off routes
router.get('/style-guide', (req,res) => res.render('style-guide'));

module.exports = router;