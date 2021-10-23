const passport = require('passport');
const localStrategy = require('./strategy/local.strategy');

passport.use(localStrategy);
