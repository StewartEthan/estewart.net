/* globals require process module */

// eslint-disable-next-line
const router = require('express').Router();

const { catchErrors } = require('../utility');
const { createVillager, getAllVillagers, searchVillagers } = require('./villagerController');

// main (root) route
router.get('/', (req,res) => {
  console.log('\n\n\nHELLO\n\n\n');
  res.render('index');
});

// /apps routes
router.get('/apps', (req,res) => {
  res.render('apps');
});
router.get('/apps/:appName', (req,res,next) => {
  if (/-admin$/.test(req.params.appName)) return next();

  const file = ('admin' in req.query)
    ? `apps/${req.params.appName}-admin`
    : `apps/${req.params.appName}`;
  res.render(file);
});

// /stardew routes
router.get('/stardew/villager/all', catchErrors(getAllVillagers));
router.get('/stardew/villager/:name', catchErrors(searchVillagers));
router.post('/stardew/villager', catchErrors(createVillager));

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

// /api routes
router.get('/api/ldsconf', (req,res) => {
  // Set up config stuff
  const twitterConfig = {
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    bearer_token: process.env.TWITTER_BEARER_TOKEN
  };
  const twitter = new (require('twitter'))(twitterConfig);
  const searchParams = {
    q: '#LDSconf',
    count: 1
  };

  function tweetCb(err, tweets, response) {
    if (err) res.json({ err, tweets, response });
    res.json(tweets);
  }

  // Get the tweets
  console.log('About to search tweets');
  twitter.get('search/tweets', searchParams, tweetCb);
});

module.exports = router;