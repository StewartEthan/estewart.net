const router = require('express').Router();

// main (root) route
router.get('/', (req,res) => {
  res.render('index');
});

// /apps routes
router.get('/apps', (req,res) => {
  res.render('apps');
});
router.get('/apps/:appName', (req,res) => {
  res.render(`apps/${req.params.appName}`);
});

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

// Misc routes
router.get('/pkmn', async (req,res) => {
  const baseUrl = 'http://pokeapi.co/api/v2/';
  const path = req.query.path;
  if (path) {
    const url = baseUrl + path;
    const resp = await fetch(url);
    const data = await resp.json();
    res.send(data);
  } else {
    res.status(404).render('404');
  }
  res.send(req.query.path);
});

module.exports = router;