// Initial app setup
const express   = require('express');
const fetch     = require('node-fetch');
const stylus    = require('stylus');

const app = express();

// Specify the port (I use 3000 as a default for personal dev)
app.set('port', (process.env.PORT || 3000));
app.set('viewEngine', (process.env.VIEW_ENGINE || 'pug'))

// Specify where static assets should be loaded from
app.use(express.static('assets'));
app.use('/assets', express.static('assets'));

// Set the views and views engine
app.set('views', __dirname + '/views');
app.set('view engine', app.get('viewEngine'));
app.locals.basedir = __dirname;

// Set up routes for the app
// TODO: Use separate routes.js file???
// main (root) route
app.get('/', (req,res) => {
  res.render('index');
});
// /apps routes
app.get('/apps', (req,res) => {
  res.render('apps');
});
app.get('/apps/:appName', (req,res) => {
  res.render(`apps/${req.params.appName}`);
});
// /code routes
app.get('/code', (req,res) => {
  res.render('code');
});
// /blog routes
app.get('/blog', (req,res) => {
  res.render('blog');
});
// /about route
app.get('/about', (req,res) => {
  res.render('about');
});

app.get('/pkmn', async (req,res) => {
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

// For CIT 261
// app.get('/cit261', (req,res) => {
//   res.render('cit261/index');
// });
// app.get('/cit261/:topic', (req,res) => {
//   try {
//     res.render(`cit261/${req.params.topic}`);
//   } catch (err) {
//     console.error(`An error occured while trying to render cit261/${req.params.topic}:`, err);
//     res.render('404');
//   }
// });

// 404 handling - keep as last route
app.use((req,res) => {
  res.status(404).render('404');
});

// Start listening
app.listen(app.get('port'), function() {
  console.log('Portfolio site is running on port ', app.get('port'));
});
