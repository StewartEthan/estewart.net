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

module.exports = router;