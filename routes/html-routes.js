//! This file offers a set of routes for sending users to the various html pages

//* ===================================================
//* Dependencies
//* ===================================================
const passport = require('passport');

//* ===================================================
//* Routes
//* ===================================================
module.exports = (app) => {
  //* ===================================================
  //* Log-in validation, authentication, and logout
  //* ===================================================

  // Validate user is logged in
  const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.redirect('/');
  };

  // Get linkedin authentication
  app.get(
    '/auth/linkedin',
    passport.authenticate('linkedin', function (req, res) {
      console.log(res);
    })
  );

  // Get linkedin authentication callback
  app.get(
    '/auth/linkedin/callback',
    passport.authenticate('linkedin', {
      successRedirect: '/profile',
      failureRedirect: '/login'
    })
  );

  // logout the user and send them back to the main index page
  app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
  });

  //* ===================================================
  //* HTML Routes
  //* ===================================================
  // index route loads main page
  // TODO Currently index.handlebars (CV page) - do we want this to be the job board?
  app.get('/', (req, res) => {
    res.render('login', {
      style: 'login.css'
    });
  });

  app.get('/login', (req, res) => {
    res.render('login', {
      style: 'login.css'
    });
  });

  // get the profile for logged in users
  // TODO Currently index.handlebars serves as profile page - swap this for job board?
  app.get('/profile', isLoggedIn, (req, res) => {
    res.render('profile', {
      user: req.user,
      style: 'profile.css'
    });
  });

  // TODO Build a /job-boards page that displays all job applications and their status
  app.get('/jobboard', isLoggedIn, (req, res) => {
    res.render('applications', {
      user: req.user,
      style: 'applications.css'
    });
  });

  // get the rolodex for the logged in user
  app.get('/rolodex', isLoggedIn, (req, res) => {
    res.render('rolodex');
  });
};
