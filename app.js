// Initial app setup
const express   = require('express');
const path      = require('path');
const util      = require('./utility');

const app = express();

// Specify the port (I use 3000 as a default for personal dev)
app.set('port', (process.env.PORT || 3000));
app.set('viewEngine', (process.env.VIEW_ENGINE || 'pug'))

// Specify where static assets should be loaded from
app.use(express.static(path.join(__dirname, 'public')));

// Set the views and views engine
app.locals.basedir = __dirname;
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', app.get('viewEngine'));

// Put cookies on req.cookies
app.use(require('cookie-parser')());

// Put utility functions on all requests
app.use((req,res,next) => {
  res.locals.util = util;
  next();
});

// Handle actual routing
app.use('/', require('./controllers/routes'));

// Handle routes not defined in router
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Show error page depending on environment
if (process.env.APP_ENV === 'dev') app.use(util.devErr);
app.use(util.prodErr);

// Start listening for requests
app.listen(app.get('port'), () => {
  console.log(`Express now running on port ${app.get('port')}`);
});